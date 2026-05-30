import React from "react";
import {useAuth} from '../context/AuthContext';
import './Navbar.css';

const Navbar  = ({currentPage, onNavigate}) => {
    const {user, logoutUser} = useAuth();
    return (
        <div className="navbar">
            <div className="navbar-brand">
                <h1>CP Analytics</h1>
            </div>

            <div className="navbar-links">
                <button
                    className={`nav-btn ${currentPage === 'dashboard' ? 'active' : ''}`}
                    onClick={() => onNavigate('dashboard')}
                >
                    📊 Dashboard
                </button>
                <button
                    className={`nav-btn ${currentPage === 'addProblem' ? 'active' : ''}`}
                    onClick={() => onNavigate('addProblem')}
                >
                    + Add Problem
                </button>
                <button
                    className={`nav-btn ${currentPage === 'history' ? 'active' : ''}`}
                    onClick={() => onNavigate('history')}
                >
                    📋 History
                </button>
                <button
                    className={`nav-btn ${currentPage === 'revision' ? 'active' : ''}`}
                    onClick={() => onNavigate('revision')}
                >
                    📅 Revision
                </button>
            </div>

            <div className="navbar-user">
                <span>👤 {user?.username}</span>
                <button onClick={logoutUser} className="logout-btn">Logout</button>
            </div>
        </div>
    );
};

export default Navbar;