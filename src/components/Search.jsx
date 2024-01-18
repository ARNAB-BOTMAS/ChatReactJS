import React, { useContext, useState } from 'react';
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../contex/AuthContext';

const Search = () => {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const {currentUser} = useContext(AuthContext);

    const handleSearch = async () => {
        const q = query(
            collection(db, "users"),
            where("displayName", "==", username)
        );
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            });
        } catch (err) {
            setErr(true);
        }
    };
    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }
    const handleSelect = async () => {
        //check whether the group(chats in firestore) exists, if not create
        const combindId = 
            currentUser.uid > user.uid 
                ? currentUser.uid + user.uid 
                : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combindId));

            if(!res.exists()){
                //create a chat in chats collection
                await setDoc(doc(db, "chats", combindId), { messages: [] });
                
                //cerate user chats
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combindId+".userInfo"]:{
                        uid:user.uid,
                        displayName:user.displayName,
                        photoURL:user.photoURL
                    },
                    [combindId+".date"]: serverTimestamp()
                });

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combindId+".userInfo"]:{
                        uid:currentUser.uid,
                        displayName:currentUser.displayName,
                        photoURL:currentUser.photoURL
                    },
                    [combindId+".date"]: serverTimestamp()
                });
            }
        } catch (err) {
            
        }

        setUser(null);
        setUsername("")
    };
    return (
        <div className='search'>
            <div className="searchForm">
                <input type="text" placeholder='Find User....' onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)} value={username}/>
                <button onClick={handleSearch} className='SearchBtn'><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <span className={`error-message ${err ? '' : 'error-message-hidden'}`}>
                User Not Found!!!
            </span>
            {user && <div className="userChat" onClick={handleSelect}>
                <img src={user.photoURL} alt="" />
                <div className="userChatInfo">
                    <span>{user.displayName}</span>
                </div>
            </div>}
        </div>
    );
}

export default Search;
