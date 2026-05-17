import React, {useState} from 'react'
import { useAuth } from './context/AuthContext';
import Login from './pages/Login'
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddProblem from './pages/AddProblem';
import History from './pages/History';
import Revision from './pages/Revision';
import './App.css'

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
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

  if(currentPage === "addProblem") {
    return <AddProblem onBack={() => setCurrentPage('dashboard')}/>
  }

  if(currentPage === "history") {
    return <History onBack={() => setCurrentPage('dashboard')}/>
  }

  if (currentPage === 'revision') {
    return <Revision onBack={() => setCurrentPage('dashboard')} />;
  }

  return <Dashboard 
    onAddProblem={() => setCurrentPage('addProblem')}
    onHistory={() => setCurrentPage('history')}
    onRevision={() => setCurrentPage('revision')}
  />;
}

export default App;