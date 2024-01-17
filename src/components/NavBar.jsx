import { signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import { auth } from '../firebase';
import { AuthContext } from '../contex/AuthContext';

const NavBar = () => {
    const {currentUser} = useContext(AuthContext)
    return (
        <div className='navbar'>
            <span className='logo'>AMAS</span>
            <div className="user">
                <img src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
                <button onClick={()=>signOut(auth)}><i class="fa-solid fa-arrow-right-from-bracket"></i></button>
            </div>
        </div>
    );
}

export default NavBar;
