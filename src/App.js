import RegisterPage from '../src/pages/RegisterPage';
import LoginPage from '../src/pages/LoginPage';
import HomePage from '../src/pages/HomePage';
import NotFoundPage from '../src/pages/NotFoundPage';
import ChatPage from '../src/pages/ChatPage';
import './scss/register.scss';
import './scss/login.scss';
import './scss/home.scss';
import './scss/error.scss';
import './scss/chats.scss';
import './scss/phone.scss';

// import Design from './components/Design';
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from './contex/AuthContext';
import { useContext } from 'react';
// import dotenv from 'dotenv';

// dotenv.config();
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
        <Routes>
          <Route path='/' index element={<HomePage />}/>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/chats' element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
          }/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </div>
  );
}

export default App;

