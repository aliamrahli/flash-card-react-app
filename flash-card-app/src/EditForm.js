import React, { useState } from 'react';


const EditForm = ({ card, onSave, onCancel }) => {
  const [editedCard, setEditedCard] = useState({ ...card });

  const handleInputChange = (e) => {
    setEditedCard({ ...editedCard, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(editedCard);
  };

  return (
    <div className="EditForm">
      <div>
        <label>Front:</label>
        <input type="text" name="front" value={editedCard.front} onChange={handleInputChange} />
      </div>
      <div>
        <label>Back:</label>
        <input type="text" name="back" value={editedCard.back} onChange={handleInputChange} />
      </div>
      <div>
        <label>Status:</label>
        <select name="status" value={editedCard.status} onChange={handleInputChange}>
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
