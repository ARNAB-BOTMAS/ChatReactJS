import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../contex/AuthContext";
import { ChatContext } from "../contex/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  const handelDolwnloadFile = () =>{
    window.open(message.file);
  }
  const handelDolwnloadImg = () =>{
    window.open(message.img);
  }
  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        {/* <span>just now</span> */}
      </div>
      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
        {message.img && <img src={message.img} alt="" onClick={handelDolwnloadImg}/>}
        {message.file && 
          <div className="fileContent" onClick={handelDolwnloadFile}>
            <div className="download">
              <button onClick={handelDolwnloadFile}><i class="fa-solid fa-download"></i></button>
            </div>  
            <div class="files"> 
              <span>
                File
              </span>
              <span className="downloadFile">
                <i class="fa-solid fa-file-pdf"></i>  
              </span> 
            </div>

          </div>
        }
      </div>
    </div>
  );
};

export default Message;