import React from 'react';
import Design from '../components/Design';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';

const Home = () => {
    return (
        <div className='home'>
            <div className="container">
                <Sidebar />
                <Chat />
            </div> 
            <Design />           
        </div>
    );
}

export default Home;
