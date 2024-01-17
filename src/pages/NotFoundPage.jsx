import React from 'react';
import Lottie from 'lottie-react';
import error from '../animation/404.json';

const NotFoundPage = () => {
    return (
        <div className='desktopError'>
            <div className="desktopErrorWrapper">
                <Lottie loop={true} animationData={error} className='errorWrapper'/>
            </div>
        </div>
    );
}

export default NotFoundPage;
