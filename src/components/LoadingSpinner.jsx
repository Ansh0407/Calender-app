import React from 'react';
import './LoadingSpinner.css'; 

const LoadingSpinner = () => {
  return (
   
    <div className="spinner-overlay">
      <div className="spinner"> <br/></div>
      <div className="text"> Welcome to my calender app <br/> Created by &copy; Ansh Bhandari</div>
    </div>
  );
};

export default LoadingSpinner;
