// src/pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import './notFound.css'; 

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 -not found</h1>
      <Link to="/" className="back-home-btn">back home</Link>
    </div>
  );
};

export default NotFound;
