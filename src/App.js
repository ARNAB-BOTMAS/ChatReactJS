import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
// import Home from './pages/Home';
import ChatPage from './pages/ChatPage';
// import UnderManu from './pages/UnderManu';
import './scss/register.scss';
import './scss/login.scss';
import './scss/home.scss';
import './scss/error.scss';
import './scss/chats.scss';
import './scss/phone.scss';

// import Design from './components/Design';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './contex/AuthContext';
import { useContext } from 'react';

function App() {
  const {currentUser} = useContext(AuthContext);
  
  const ProtectedRoute = ({children}) => {
    if (!currentUser) {
      return <Navigate to="/login"/>;
    }
    return children;
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path='/' element={<UnderManu />}/> */}
          <Route path='/chats' element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>}/>
          <Route path='/' element={<HomePage />}/>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

