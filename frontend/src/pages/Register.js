import React, {useState} from 'react';
import {register} from '../utils/api';
import './Login.css'

const Register = ({onSwitchToLogin}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(' ');
        setSuccess(' ');
        setLoading(true);

        try {
            await register({username, email, password});
            setSuccess("Registration successful! Please login.");
            setTimeout(() => onSwitchToLogin(), 2000);
        }
        catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className='auth-container'>
            <div className='auth-box'>
                <h2>CP Analytics</h2>
                <h3>Register</h3>
                {error && <p className='error-msg'>{error}</p>}
                {success && <p className='success-msg'>{success}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input 
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type='submit' disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                <p>Already have an account?{' '}
                    <span onClick={onSwitchToLogin}>Login</span>
                </p>
            </div>
        </div>
    );
};

export default Register;