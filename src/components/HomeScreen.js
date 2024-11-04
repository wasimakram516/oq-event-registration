import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';


function HomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="home-screen">
      <button className="register-button" onClick={() => navigate('/form')}>
        Register
      </button>
    </div>
  );
}

export default HomeScreen;
