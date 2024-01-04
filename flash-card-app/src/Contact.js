import React, { useState } from 'react';
import './style/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    subject: '',
    email: '',
    content: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the message to the server
    fetch('http://localhost:8001/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Message sent successfully:', data);
        // Optionally, you can redirect the user to a thank-you page or perform other actions.
      })
      .catch((error) => console.error('Error sending message:', error));
  };

  return (
    <div className="Contact">
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Subject:</label>
          <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required />
        </div>
        <div>
          <label className="form-group">Email Address:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Message:</label>
          <textarea name="content" id="content" value={formData.content} onChange={handleInputChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
