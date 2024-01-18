import React from 'react';
import Lottie from 'lottie-react';
import MegAnimation from '../animation/Message.json';

const PlaceHolder = () => {
    return (
        <div className='place'>
            <Lottie loop={true} animationData={MegAnimation} className='lottieAni'/>
        </div>
    );
}

export default PlaceHolder;
