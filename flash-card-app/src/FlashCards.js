import React, { useState } from 'react';

const FlashCard = ({ id, front, back, status, lastModified, onEdit, onDelete }) => (
  <div className="FlashCard">
    <div className="Front">{front}</div>
    <div className="Back">
      <p>{back}</p>
      <p>Status: {status}</p>
      <p>Last Modified: {lastModified}</p>
    </div>
    <div className="CardActions">
      <button onClick={() => onEdit(id)}>Edit</button>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  </div>
);

const FlashCards = () => {
  const [newCard, setNewCard] = useState({ front: '', back: '', status: 'Noted' });
  const [flashCards, setFlashCards] = useState([
    // Example flash cards data
    {
      id: 1,
      front: 'What is React?',
      back: 'React is a JavaScript library for building user interfaces.',
      status: 'Learned',
      lastModified: '2023-01-01 12:30 PM',
    },
    // Add more flash cards as needed
  ]);

  const [editableCard, setEditableCard] = useState(null);

  const handleInputChange = (e) => {
    setNewCard({ ...newCard, [e.target.name]: e.target.value });
  };

  const handleAddCard = () => {
    setFlashCards([...flashCards, { id: flashCards.length + 1, ...newCard, lastModified: getCurrentDateTime() }]);
    setNewCard({ front: '', back: '', status: 'Noted' });
  };

  const handleEdit = (id) => {
    setEditableCard(id);
  };

  const handleSaveEdit = (id, updatedCard) => {
    setFlashCards((prevCards) =>
      prevCards.map((card) => (card.id === id ? { ...card, ...updatedCard, lastModified: getCurrentDateTime() } : card))
    );
    setEditableCard(null);
  };

  const handleDelete = (id) => {
    setFlashCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return `${now.toISOString().slice(0, 19).replace('T', ' ')} ${now.toLocaleTimeString()}`;
  };

  return (
    <div className="FlashCards">
      <h2>Flash Cards</h2>
      <div className="FlashCardContainer">
        {flashCards.map((card) => (
          <FlashCard
            key={card.id}
            {...card}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Form to add new flash cards */}
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