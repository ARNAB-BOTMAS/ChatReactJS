import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import Design from '../components/Design';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';


const override = css`
  display: block;
  margin: 0 auto;
  height: '5px'
  border-color: red;
`;
const LoginPage = () => {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      let timeoutId;
  
      if (err) {
        timeoutId = setTimeout(() => {
          setErr(false);
        }, 5000);
      }
  
      return () => {
        clearTimeout(timeoutId);
      };
    }, [err]);
  
    const goto = () => {
      navigate('/register');
    };
  
    const goBack = () => {
      navigate(-1);
    };
  
    const handleSubmit = async (e) => {
      setLoading(true);
      e.preventDefault();
      const email = e.target[0].value;
      const password = e.target[1].value;
  
      try {
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/chats');
      } catch (err) {
        setErr(true);
        setLoading(false);
      }
    };
    return(
        <div className="desktopUpperLog">
            <div className="desktopBackLog">
                <button onClick={goBack}>
                    <i class="fa-solid fa-arrow-left"></i>
                </button>
            </div>
            <div className="desktopFormLog">
                <div className="desktopWarapp">
                    <span className="logo">AMAS</span>
                    <span className="title">Login</span>
                    <form className="desktopFromField" onSubmit={handleSubmit}>
                        <input type='text' name='email' id="email" placeholder='Email' />
                        <input type="password" name="password" id="password" placeholder="Password" />
                        <button className="Login" disabled={loading}>
                            {loading ? (
                                <PulseLoader 
                                css={override} 
                                size={9} 
                                color={'#fff'} 
                                loading={loading}
                                />
                            ) : (
                                'Log In'
                            )}
                        </button>
                        <span className={`error-message ${err ? '' : 'error-message-hidden'}`}>
                            Something went wrong <i class="fa-solid fa-bug fa-shake"></i>
                        </span>
                    </form>
                    <p>You don't have an account? <span onClick={goto} className="goto">Register</span></p>
                </div>
            </div>
            <Design />
        </div>

    );
}

export default LoginPage;