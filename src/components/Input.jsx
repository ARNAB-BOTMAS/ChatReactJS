import React, { useContext, useState } from 'react';
import { AuthContext } from '../contex/AuthContext';
import { ChatContext } from '../contex/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { ScaleLoader } from 'react-spinners';
import { css } from '@emotion/react';

const override = css`
  display:block;
  margin: 0 auto;
  height: '5px';
  border-color: red;
`;
const Input = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [loading, setLoading] = useState(false);


  const handleSend = async () => {
    let lastMessage;
    try {
      setLoading(true);
      if (img) {
        lastMessage = "Attach File";
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
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [`${data.chatId}.lastMessage`]: {
            text: lastMessage
          },
          [`${data.chatId}.date`]: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', data.user.uid), {
          [`${data.chatId}.lastMessage`]: {
            text: lastMessage
          },
          [`${data.chatId}.date`]: serverTimestamp(),
        });
        /* setLoading(false); */
      } else if (file) {
        lastMessage = "Attach File";
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
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [`${data.chatId}.lastMessage`]: {
            text: lastMessage
          },
          [`${data.chatId}.date`]: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', data.user.uid), {
          [`${data.chatId}.lastMessage`]: {
            text: lastMessage
          },
          [`${data.chatId}.date`]: serverTimestamp(),
        });
        /* setLoading(false); */
      } else {
        await updateDoc(doc(db, 'chats', data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          })
        });
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
        /* setLoading(false); */
      }

      setText('');
      setImg(null);
      setFile(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error handling send:', error);
    }
  };

  return (
    <div className='input'>
      <input
        type='text'
        placeholder='Type something...'
        className='messageSend'
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className='send'>
        <label>
            <i className='fa-solid fa-paperclip'></i>
          <input
            type='file'
            id='file'
            accept='*/*'
            className='inputfile'
            onChange={(e) => setFile(e.target.files)}
          />
        </label>
  
        <label>
          <span>
            <i className='fa-solid fa-image'></i>
          </span>
          <input
            type='file'
            accept='image/*'
            id='image'
            className='inputfile'
            onChange={(e) => setImg(e.target.files)}
          />
        </label>
  
        <button onClick={handleSend} disabled={loading}>
          {loading ? (
            <ScaleLoader css={override} size={9} color={'#fff'} loading={loading} />
          ) : (
            <span>
              <i className='fa-solid fa-paper-plane'></i> Send
            </span>
          )}
        </button>

      </div>
    </div>
  );
}
export default Input;
