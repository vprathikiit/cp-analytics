import React, {useState} from 'react'
import { useAuth } from './context/AuthContext';
import Login from './pages/Login'
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css'

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const {user, loading} = useAuth();

  if(loading) {
    return <div style = {{textAlign: 'center', marginTop: '50px'}}>Loading...</div>;
  }

  if(!user) {
    return showLogin ? (
      <Login onSwitchToRegister={() => setShowLogin(false)} />
    ) : (
      <Register onSwitchToLogin= {() => setShowLogin(true)} />
    );
  }

  return <Dashboard />;
}

export default App;