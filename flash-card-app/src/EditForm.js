import React, { useState } from 'react';
import './style/Edit.css'

const EditForm = ({ card, onSave, onCancel }) => {
  const [editedCard, setEditedCard] = useState({ ...card });

  const handleInputChange = (e) => {
    setEditedCard({ ...editedCard, [e.target.name]: e.target.value });
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
  };

  const handleSave = (e) => {
    setEditedCard({
      question: '',
      answer: '',
      desc: '',
      status: 'Learned', // You might want to reset the status to a default value
    });
    onSave(editedCard);
    e.stopPropagation();
  };

  return (
    <div className="EditForm">
      <div>
        <label>Question:</label>
        <input type="text" name="question" value={editedCard.question} onChange={handleInputChange} onClick={handleEditClick}/>
      </div>
      <div>
        <label>Answer:</label>
        <input type="text" name="answer" value={editedCard.answer} onChange={handleInputChange} onClick={handleEditClick} />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" name="desc" value={editedCard.desc} onChange={handleInputChange} onClick={handleEditClick}/>
      </div>
      <div>
        <label className='select'>Status:</label>
        <select name="status" value={editedCard.status} onChange={handleInputChange} onClick={handleEditClick}>
          <option value="Learned">Learned</option>
          <option value="Want to Learn">Want to Learn</option>
          <option value="Noted">Noted</option>
        </select>
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditForm;
