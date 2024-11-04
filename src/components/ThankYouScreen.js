import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function ThankYouScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically return to the Home screen after a few seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000); // Display for 3 seconds

    return () => clearTimeout(timer); // Clear timer on component unmount
  }, [navigate]);

  return <div className="thank-you-screen"></div>;
}

export default ThankYouScreen;
