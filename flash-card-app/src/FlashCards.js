import React, { useState, useEffect } from 'react';
import EditForm from './EditForm';

const FlashCard = ({ id, front, back, status, lastModified, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = (editedCard) => {
    onEdit(id, editedCard);
    setIsEditing(false);
  };

  return (
  <div className="FlashCard">
    <div className="Front">{front}</div>
    <div className="Back">
      <p>{back}</p>
      <p>Status: {status}</p>
      <p>Last Modified: {lastModified}</p>
      {!isEditing && (
          <div>
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={() => onDelete(id)}>Delete</button>
          </div>
        )}
        {isEditing && (
          <EditForm
            card={{ id, front, back, status, lastModified }}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
          />
        )}
    </div>
  </div>
)};

const FlashCards = () => {
  const [newCard, setNewCard] = useState({ front: '', back: '', status: 'Noted' });
  const [flashCards, setFlashCards] = useState(null);
  const [originalFlashCards, setOriginalFlashCards] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortOption, setSortOption] = useState('lastModified'); 

  const sortFlashCards = (cards, sortBy) => {
    const sortedCards = [...cards];

    switch (sortBy) {
      case 'front':
        sortedCards.sort((a, b) => a.front.localeCompare(b.front));
        break;
      case 'back':
        sortedCards.sort((a, b) => a.back.localeCompare(b.back));
        break;
      case 'status':
        sortedCards.sort((a, b) => a.status.localeCompare(b.status));
        break;
      case 'lastModified':
        sortedCards.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
        break;
      default:
        // Default sorting by lastModified
        sortedCards.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
        break;
    }

    setFlashCards(sortedCards);
  };
  useEffect(() => {
    fetchFlashCards();
  }, []);



  const fetchFlashCards = () => {
    fetch('http://localhost:8000/cards')
      .then((response) => response.json())
      .then((data) => {
        sortFlashCards(data);
        setOriginalFlashCards(data);
      })
      .catch((error) => console.error('Error fetching flash cards:', error));
  };




  const handleInputChange = (e) => {
    setNewCard({ ...newCard, [e.target.name]: e.target.value });
  };

  const handleAddCard = () => {
    const newFlashCard = {
      id: flashCards.length + 1,
      ...newCard,
      lastModified: getCurrentDateTime(),

    };
    setFlashCards([...flashCards, newFlashCard]);
    saveFlashCard(newFlashCard);
  };

  const saveFlashCard = (card) => {
    fetch('http://localhost:8000/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(card),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Flash card added successfully:', data);
        fetchFlashCards(); 
      })
      .catch((error) => console.error('Error adding flash card:', error));
  };


  const handleDelete = (id) => {
    setFlashCards((prevCards) => prevCards.filter((card) => card.id !== id));
    deleteFlashCard(id);
  };

  const deleteFlashCard = (id) => {
    fetch(`http://localhost:8000/cards/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete flash card');
        }
        console.log('Flash card deleted successfully:', id);
        fetchFlashCards(); 
      })
      .catch((error) => console.error('Error deleting flash card:', error));
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    return `${formattedDate}`;
  };

  const handleEdit = (id, editedCard) => {
    setFlashCards((prevCards) =>
      prevCards.map((card) => (card.id === id ? { ...card, ...editedCard, lastModified: getCurrentDateTime() } : card))
    );

    updateFlashCard(id, editedCard);
  };
  const updateFlashCard = (id, editedCard) => {
    fetch(`http://localhost:8000/cards/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...editedCard, lastModified: getCurrentDateTime() }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Flash card updated successfully:', data);
        fetchFlashCards(); 
      })
      .catch((error) => console.error('Error updating flash card:', error));
  };
  const handleSearch = () => {
    const searchTextLowerCase = searchText.toLowerCase();
    const filteredCards = originalFlashCards.filter(
      (card) =>
        (card.front.toLowerCase().includes(searchTextLowerCase) ||
          card.back.toLowerCase().includes(searchTextLowerCase)) &&
        (filterStatus === '' || card.status.toLowerCase() === filterStatus.toLowerCase())
    );
    setFlashCards(filteredCards);
    sortFlashCards(filteredCards,sortOption);
  };

  const clearSearch = () => {
    setSearchText('');
    fetchFlashCards(); // Reload and sort all flash cards
  };
  const handleStatusFilter = (e) => {
    const newFilterStatus = e.target.value;
    const searchTextLowerCase = searchText.toLowerCase();
    setFilterStatus(newFilterStatus);
    const filteredCards = originalFlashCards.filter(
      (card) =>
        (card.front.toLowerCase().includes(searchTextLowerCase) ||
          card.back.toLowerCase().includes(searchTextLowerCase)) &&
        (newFilterStatus === '' || card.status.toLowerCase() === newFilterStatus.toLowerCase())
    );
    sortFlashCards(filteredCards,sortOption);
  };

  const handleSortChange = (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
    sortFlashCards(flashCards, newSortOption);
  };


  return (
    <div className="FlashCards">
      <h2>Flash Cards</h2>
      <div className="SearchBar">
        <input
          type="text"
          placeholder="Search cards..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={clearSearch}>Clear</button>
      </div>
      <div className="SortAndFilter">
        <label>Sort By:</label>
        <select value={sortOption} onChange={handleSortChange}>
          <option value="front">Front Text</option>
          <option value="back">Back Text</option>
          <option value="status">Status</option>
          <option value="lastModified">Last Modified</option>
        </select>
      </div>
      <div className="StatusFilter">
        <label>Status:</label>
        <select value={filterStatus} onChange={handleStatusFilter}>
          <option value="">All</option>
          <option value="Learned">Learned</option>
          <option value="Want to Learn">Want to Learn</option>
          <option value="Noted">Noted</option>
        </select>
      </div>
      <div className="FlashCardContainer">
        {flashCards && flashCards.map((card) => (
          <FlashCard
            key={card.id}
            {...card}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <div className="AddCardForm">
        <h3>Add New Flash Card</h3>
        <div>
          <label>Front:</label>
          <input type="text" name="front" value={newCard.front} onChange={handleInputChange} />
        </div>
        <div>
          <label>Back:</label>
          <input type="text" name="back" value={newCard.back} onChange={handleInputChange} />
        </div>
        <div>
          <label>Status:</label>
          <select name="status" value={newCard.status} onChange={handleInputChange}>
            <option value="Learned">Learned</option>
            <option value="Want to Learn">Want to Learn</option>
            <option value="Noted">Noted</option>
          </select>
        </div>
        <button onClick={handleAddCard}>Add Card</button>
      </div>
    </div>
  );
};

export default FlashCards;