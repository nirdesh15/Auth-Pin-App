import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home.scss'; // Ensure the path is correct

const SuccessCard = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/'); // Redirect to login if not authenticated
    } else {
      setAuthenticated(true);
    }
  }, [navigate]);

  return (
    authenticated && (
      <div className="card">
        <div className="icon-container">
          <i className="checkmark">✓</i>
        </div>
        <h1>Success</h1>
        <p>Test Succesul!</p>
        <br/>
        <button > <Link to='/'>Go back</Link></button>
      </div>
      
    )
  );
};

export default SuccessCard;
