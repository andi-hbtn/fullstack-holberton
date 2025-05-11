// ForgotPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post('http://localhost:3000/auth/forgot-password', { email });
            setMessage(`Reset link sent to ${email}. Check your console for the link!`);
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error sending reset link');
        }

        setLoading(false);
    };

    return (
        <div className="auth-form">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
            </form>
            {message && <div className="message">{message}</div>}
        </div>
    );
}

export default ForgotPassword;