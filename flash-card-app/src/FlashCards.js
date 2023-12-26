import React, { useState } from 'react';

const FlashCard = ({ front, back, status, lastModified }) => (
  <div className="FlashCard">
    <div className="Front">{front}</div>
    <div className="Back">
      <p>{back}</p>
      <p>Status: {status}</p>
      <p>Last Modified: {lastModified}</p>
    </div>
  </div>
);

const FlashCards = () => {
  
  const flashCardsData = [
    {
      front: 'What is React?',
      back: 'React is a JavaScript library for building user interfaces.',
      status: 'Learned',
      lastModified: '2023-01-01 12:30 PM',
    },
    {
        front: 'What is React?',
        back: 'React is a JavaScript library for building user interfaces.',
        status: 'Learned',
        lastModified: '2023-01-01 12:30 PM',
      },
      {
        front: 'What is React?',
        back: 'React is a JavaScript library for building user interfaces.',
        status: 'Learned',
        lastModified: '2023-01-01 12:30 PM',
      },
      {
        front: 'What is React?',
        back: 'React is a JavaScript library for building user interfaces.',
        status: 'Learned',
        lastModified: '2023-01-01 12:30 PM',
      },
    
  ];

  return (
    <div className="FlashCards">
      <h2>Flash Cards</h2>
      <div className="FlashCardContainer">
        {flashCardsData.map((card, index) => (
          <FlashCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default FlashCards;
