import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function FormScreen() {
  const navigate = useNavigate();
  const [isInactive, setIsInactive] = useState(false);
  const timerRef = useRef(null);
  const iframeRef = useRef(null);

  // Function to reset the inactivity timer and hide the popup
  const resetInactivityTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current); // Clear any existing timer
    setIsInactive(false); // Hide inactivity popup
    startInactivityTimer(); // Restart the timer
  };

  // Function to start the inactivity timer
  const startInactivityTimer = () => {
    timerRef.current = setTimeout(() => {
      setIsInactive(true); // Show inactivity popup after 30 seconds
    }, 30000); // 30000 ms = 30 seconds
  };

  // Setup event listeners to reset the timer on iframe focus
  useEffect(() => {
    startInactivityTimer(); // Start the timer on mount

    const handleIframeFocus = () => resetInactivityTimer();

    // Add focus event listener to the iframe
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('focus', handleIframeFocus);
    }

    // Cleanup timer and event listeners on component unmount
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (iframe) iframe.removeEventListener('focus', handleIframeFocus);
    };
  }, []);

  // Function to navigate to the Thank You screen
  const handleFinish = () => {
    navigate('/thank-you'); // Navigate to Thank You screen
  };

  return (
    <div className="form-screen-container">
      <iframe
        ref={iframeRef}
        src="https://docs.google.com/forms/d/e/1FAIpQLSeX3uhm60oVaH8ZfYwfX1iSEyWZYMoUv-Oh3VLlCE7H-haBCA/viewform"
        className="form-iframe"
        title="Registration Form"
      ></iframe>

      {/* Inactivity Popup */}
      {isInactive && (
        <div className="inactivity-dialog">
          <div className="dialog-content">
            <p>It seems you've been inactive for a while. Would you like to continue, or have you finished?</p>
            <button onClick={resetInactivityTimer} className="dialog-button continue-button">
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
