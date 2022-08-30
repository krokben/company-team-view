import React from "react";
import "./loading-spinner.css";

const LoadingSpinner = () => (
  <div className="loading-spinner">
    {[...Array(12)].map((_, index) => (
      <div key={index}></div>
    ))}
  </div>
);

export default LoadingSpinner;
