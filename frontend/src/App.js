import React, {useState} from 'react'
import { useAuth } from './context/AuthContext';
import Login from './pages/Login'
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddProblem from './pages/AddProblem';
import History from './pages/History';
import Revision from './pages/Revision';
import Navbar from './pages/Navbar';
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

  const renderPage = () => {
    switch (currentPage) {
      case 'addProblem':
        return <AddProblem onBack={() => setCurrentPage('dashboard')} />;
      case 'history':
        return <History onBack={() => setCurrentPage('dashboard')} />;
      case 'revision':
        return <Revision onBack={() => setCurrentPage('dashboard')} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="App">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="page-content">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;