import React from 'react';
import Lottie from 'lottie-react';
import error from '../animation/manufature.json';

const UnderManu = () => {
    return (
        <div className='desktopManu'>
            <div className="desktopManuWrapper">
                <Lottie loop={true} animationData={error} className='manuWrapper'/>
            </div>
        </div>
    );
}

export default UnderManu;
