import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
// import { css } from '@emotion/react';
// import ClipLoader from "react-spinners/ClipLoader";
// import { ScaleLoader } from 'react-spinners';
import { PulseLoader } from 'react-spinners';
import Lottie from 'lottie-react';
import animation from '../animation/add.json';
import Design from '../components/Design';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth, storage, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const override = css`
  display: block;
  margin: 0 auto;
  height: '5px'
  border-color: red;
`;


const RegisterPage = () => {
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
    navigate('/login');
  };

  const goBack = () => {
    navigate(-1);
  };
  if(auth.currentUser){
    navigate("/chats");
  }
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[2].value;
    const password = e.target[1].value;
    const file = e.target[3].files[0];

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            // Create user on firestore
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            // Create empty user chats on firestore
            await setDoc(doc(db, 'userChats', res.user.uid), {});
            navigate('/chats');
          } catch (err) {
            console.log(err);
            setErr(true);
          } finally {
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="desktopUpperReg">
      <div className="desktopBackReg">
        <button onClick={goBack}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      </div>
      <div className="desktopFormReg">
        <div className="desktopWarapp">
          <span className="logo">AMAS</span>
          <span className="title">Register</span>
          <form className="desktopFromField" onSubmit={handleSubmit}>
            <input type="text" name="username" id="username" placeholder="Username" />
            <input type="password" name="password" id="password" placeholder="Password" />
            <input type="email" name="email" id="email" placeholder="Email" />
            <input type="file" name="profilepic" id="profilepic" accept='image/*' className="profilepic" />
            <label htmlFor="profilepic">
              <Lottie loop={true} animationData={animation} className="desktop-profile" />
              Add Profile Picture
            </label>
            <button className="register" disabled={loading}>
                {loading ? (
                    <PulseLoader 
                    css={override} 
                    size={9} 
                    color={'#fff'} 
                    loading={loading}
                    />
                ) : (
                    'Sign Up'
                )}
            </button>
            <span className={`error-message ${err ? '' : 'error-message-hidden'}`}>
              Something went wrong <i class="fa-solid fa-bug fa-shake"></i>
            </span>
          </form>
          <p>
            You do have an account? <span onClick={goto} className="goto">Login</span>
          </p>
        </div>
      </div>
      <Design />
    </div>
  );
};

export default RegisterPage;
