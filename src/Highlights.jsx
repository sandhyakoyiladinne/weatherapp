// src/Highlights.js
import React from 'react';
import './Highlights.css';

const Highlights = ({ highlightsData }) => {
  return (
    <div className="highlights-container">
      <h2>Today's Highlights</h2>
      <div className="highlights-grid xxx">
        {highlightsData.map((highlight, index) => (
          <div key={index} className="highlight-item">
            <span className="highlight-label">{highlight.label}</span>
            <span className="highlight-value">{highlight.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Highlights;
