import React from 'react';
import Home from './Home';
import Phone from './Phone';
import '../scss/frame.scss';

const ChatPage = () => {
    return (
        <div className='frame'>
            <div className="desktop">
                <Home />
            </div>
            <div className="phone">
                <Phone />
            </div>
        </div>
    );
}

export default ChatPage;
