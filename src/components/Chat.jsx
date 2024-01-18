import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
// import PhoneInput from "./PhoneInput";
import { ChatContext } from "../contex/ChatContext";


const Chat = () => {
  const { data } = useContext(ChatContext);
  console.log(data);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span className="name">
          {data.user?.displayName ? data.user.displayName : "Welcome"}
        </span>
        <div className="chatIcons">
            <span><i class="fa-solid fa-video"></i></span>
            <span><i class="fa-solid fa-user-plus"></i></span>
            <span><i class="fa-solid fa-ellipsis"></i></span>
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;