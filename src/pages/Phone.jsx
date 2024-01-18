import React, { useContext, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import { ChatContext } from '../contex/ChatContext';

const Phone = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { data } = useContext(ChatContext);
    console.log(data);
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    //   console.log(isSidebarOpen);
    };

    return (
        <div className={`phone ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <div className="container">
                <nav className="navbar">
                    <span>
                        {data.user?.displayName ? data.user.displayName : "Welcome"}                    
                    </span>
                    <div className={`hamburger-icon ${isSidebarOpen ? 'cross' : ''}`} onClick={toggleSidebar}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </nav>
                {isSidebarOpen && <Sidebar />}
                <Chat />
            </div>
        </div>
    );
}

export default Phone;
