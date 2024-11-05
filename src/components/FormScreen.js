import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function FormScreen() {
  const navigate = useNavigate();
  const [isInactive, setIsInactive] = useState(false);
  let timer;

  const resetTimer = () => {
    // Clear any existing timer
    clearTimeout(timer);

    // Set inactivity state to false, removing popup if shown
    setIsInactive(false);

    // Restart the timer
    timer = setTimeout(() => {
      setIsInactive(true); // Show inactivity popup after 30 seconds
    }, 30000); // 30000 ms = 30 seconds
  };

  useEffect(() => {
    // Start the inactivity timer when component mounts
    resetTimer();

    // Listen to user interactions on the main window
    const handleUserActivity = () => resetTimer();

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);

    // Clean up the timer and event listeners on component unmount
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
    };
  }, []);

  const handleFinish = () => {
    navigate('/thank-you'); // Navigate to Thank You screen
  };

  return (
    <div className="form-screen-container">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSeX3uhm60oVaH8ZfYwfX1iSEyWZYMoUv-Oh3VLlCE7H-haBCA/viewform"
        className="form-iframe"
        title="Registration Form"
      ></iframe>
      
      {/* Popup for inactivity */}
      {isInactive && (
        <div className="inactivity-dialog">
          <div className="dialog-content">
            <p>It seems you've been inactive for a while. Would you like to continue, or have you finished?</p>
            <button onClick={resetTimer} className="dialog-button continue-button">
              Continue
            </button>
            <button onClick={handleFinish} className="dialog-button finish-button">
              Finish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormScreen;
