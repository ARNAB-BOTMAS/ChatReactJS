import React, { useContext, useState } from 'react';
import { AuthContext } from '../contex/AuthContext';
import { ChatContext } from '../contex/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    try {
      if (img) {
        const imageRef = ref(storage, uuid());
        await uploadBytesResumable(imageRef, img[0]).then(() => {
          getDownloadURL(imageRef).then(async (downloadURL) => {
            await updateDoc(doc(db, 'chats', data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        });
      } else if (file) {
        const fileRef = ref(storage, uuid());
        await uploadBytesResumable(fileRef, file[0]).then(() => {
          getDownloadURL(fileRef).then(async (downloadURL) => {
            await updateDoc(doc(db, 'chats', data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                file: downloadURL,
              }),
            });
          });
        });
      } else {
        await updateDoc(doc(db, 'chats', data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }

      await updateDoc(doc(db, 'userChats', currentUser.uid), {
        [`${data.chatId}.lastMessage`]: {
          text,
        },
        [`${data.chatId}.date`]: serverTimestamp(),
      });

      await updateDoc(doc(db, 'userChats', data.user.uid), {
        [`${data.chatId}.lastMessage`]: {
          text,
        },
        [`${data.chatId}.date`]: serverTimestamp(),
      });

      setText('');
      setImg(null);
      setFile(null);
    } catch (error) {
      console.error('Error handling send:', error);
    }
  };

  return (
    <div className='input'>
      <input type='text' placeholder='Type something...' className='messageSend' onChange={(e) => setText(e.target.value)} value={text} />
      <div className='send'>
        <input type='file' id='file' className='inputfile' onChange={(e) => setFile(e.target.files)} />
        <label htmlFor='file'>
          <span>
            <i className='fa-solid fa-paperclip'></i>
          </span>
        </label>
        <input type='file' accept='image/*' id='image' className='inputfile' onChange={(e) => setImg(e.target.files)} />
        <label htmlFor='image'>
          <span>
            <i className='fa-solid fa-image'></i>
          </span>
        </label>
        <button onClick={handleSend}>
          <span>
            <i className='fa-solid fa-paper-plane'></i> Send
          </span>
        </button>
      </div>
    </div>
  );
};

export default Input;
