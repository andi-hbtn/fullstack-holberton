// ResetPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords must match!');
            return;
        }

        setLoading(true);

        try {
            await axios.post(`http://localhost:3000/auth/reset-password/${token}`, {
                newPassword: password
            });
            setMessage('Password reset successfully! Redirecting...');
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Password reset failed');
        }

        setLoading(false);
    };

    return (
        <div className="auth-form" >
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
            {message && <div className="message">{message}</div>}
        </div >
    );
}

export default ResetPassword;