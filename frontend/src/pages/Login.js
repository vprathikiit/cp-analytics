import React, {useState} from 'react';
import { useAuth } from '../context/AuthContext';
import {login} from '../utils/api';
import './Login.css';

const Login = ({onSwitchToRegister}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const {loginUser} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await login({email, password});
            loginUser(response.data.user, response.data.token);
        }
        catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className='auth-container'>
            <div className='auth-box'>
                <h2>CP Analytics</h2>
                <h3>Login</h3>
                {error && <p className='error-msg'>{error}</p>}
                <form onSubmit={handleSubmit}>
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
                        {loading ? "Logging in ..." : "Login"}
                    </button>
                </form>
                <p>Don't have an account?{' '}
                    <span onClick={onSwitchToRegister}>Register</span>
                </p>
            </div>
        </div>
    );
};

export default Login;