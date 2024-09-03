import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.scss'; // Import your SCSS file

const Login = () => {
    const [inputs, setInputs] = useState(Array(6).fill(''));
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [success, setSuccess] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Validate the inputs to enable/disable the button
        const allValid = inputs.every(value => /^\d$/.test(value));
        const hasMissingValue = inputs.includes('');
        setIsValid(allValid && !hasMissingValue);
    }, [inputs]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^\d$/.test(value) || value === '') {
            const newInputs = [...inputs];
            newInputs[index] = value;

            // Check if the last digit is 7
            if (index === 5 && value === '7') {
                setError('The last digit cannot be 7.');
                return;
            } else {
                setError('');
            }

            setInputs(newInputs);

            // Move focus to the next input if not empty and not the last input
            if (value !== '' && index < 5) {
                document.getElementById(`input-${index + 1}`).focus();
            }
        } else {
            setError('Please enter only numeric values.');
            // Set the value to empty to clear invalid input
            const newInputs = [...inputs];
            newInputs[index] = '';
            setInputs(newInputs);
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const paste = e.clipboardData.getData('text');

        if (paste.length > 6) {
            setError('Please paste only a 6-digit numeric code. Restarting input.');
            setInputs(Array(6).fill(''));
            return;
        }

        if (/^\d{6}$/.test(paste)) {
            if (paste[5] === '7') {
                setError('The last digit cannot be 7.');
                return;
            } else {
                setError('');
            }

            setInputs(paste.split(''));
        } else {
            setError('Invalid paste. Please paste a 6-digit numeric code.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const pin = inputs.join('');

        if (pin[5] === '7') {
            setError('The last digit cannot be 7.');
            return;
        }

        if (!isValid) {
            setError('Please enter a valid 6-digit code.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('https://vercel-app-server-rho.vercel.app/verify', { pin });
            if (response.status === 200) {
                setSuccess('Verification successful! Please wait to be redirected');
                setShowSuccess(true);
                localStorage.setItem('authenticated', 'true'); // Store authentication status
                setTimeout(() => {
                    navigate('/success');
                }, 2000);
            }
        } catch (error) {
            setError('Verification Error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="page-header">Verification Code</div>
            <div className="login-container">
                <div className="content-section">
                    <div className="image-section">
                        <img src="/undraw_security_re_a2rk.svg" alt="Illustration" className="illustration img-fluid" />
                    </div>
                    <div className="form-container">
                        <div className="verification-title">Enter the required Code to Authenticate</div>
                        <form onSubmit={handleSubmit} className="verification-form" onPaste={handlePaste}>
                            <div className="inputs-container">
                                {inputs.map((value, index) => (
                                    <input
                                        key={index}
                                        id={`input-${index}`}
                                        type="text"
                                        value={value}
                                        onChange={(e) => handleChange(e, index)}
                                        className={`form-control ${value === '' || !/^\d$/.test(value) ? 'error' : ''}`}
                                        maxLength="1"
                                        pattern="[0-9]"
                                    />
                                ))}
                            </div>
                            {error && <p className="error-message">{error}</p>}
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg"
                                disabled={loading || !isValid}
                            >
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {showSuccess && (
                <div className="notification alert alert-success show">
                    {success}
                    <button type="button" className="btn-close" onClick={() => setShowSuccess(false)} aria-label="Close"></button>
                </div>
            )}
        </>
    );
};

export default Login;
