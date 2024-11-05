import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function FormScreen() {
  const navigate = useNavigate();
  const [isInactive, setIsInactive] = useState(false);
  const [timer, setTimer] = useState(0);
  const iframeRef = useRef(null);

  // Reset the inactivity timer
  const resetTimer = () => {
    setTimer(0);
    setIsInactive(false);
  };

  useEffect(() => {
    // Increment the timer every second
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    // Show popup after 30 seconds of inactivity
    if (timer >= 30 && !isInactive) {
      setIsInactive(true);
    }

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [timer, isInactive]);

  // Reset inactivity timer when there is user activity on the main window
  useEffect(() => {
    if (!isInactive) {
      const handleActivity = () => resetTimer();

      window.addEventListener('mousemove', handleActivity);
      window.addEventListener('keydown', handleActivity);
      window.addEventListener('scroll', handleActivity);

      return () => {
        window.removeEventListener('mousemove', handleActivity);
        window.removeEventListener('keydown', handleActivity);
        window.removeEventListener('scroll', handleActivity);
      };
    }
  }, [isInactive]);

  // Detect iframe focus and blur events
  useEffect(() => {
    const iframe = iframeRef.current;

    const handleIframeFocus = () => resetTimer();
    const handleIframeBlur = () => setIsInactive(true);

    if (iframe) {
      iframe.contentWindow.addEventListener('focus', handleIframeFocus);
      iframe.contentWindow.addEventListener('blur', handleIframeBlur);
    }

    return () => {
      if (iframe) {
        iframe.contentWindow.removeEventListener('focus', handleIframeFocus);
        iframe.contentWindow.removeEventListener('blur', handleIframeBlur);
      }
    };
  }, []);

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
