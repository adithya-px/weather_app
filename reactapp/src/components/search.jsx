import React, { useState } from 'react';
import './search.css';

export default function Search({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <>
      <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
          />
          <button type="submit" className="search-button">
          🔍
          </button>
        </form>
        {console.log(city)}
      </div>
      

    </>
  );
}
