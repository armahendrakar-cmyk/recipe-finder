import React from 'react';
// We will create and import its styles next
import './Loader.css';

/**
 * A simple, reusable loading spinner component.
 * It's created with pure CSS for performance and simplicity.
 */
const Loader = () => {
  // The component just renders a single div with a specific class.
  // All the magic happens in the CSS file.
  return <div className="loader"></div>;
};

export default Loader;