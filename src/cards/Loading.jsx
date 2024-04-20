import React from 'react';

const Loading = () => {
    return (
        <div className='h-full max-h-screen w-full my-auto'>

            <div className='h-full w-full flex justify-center text-center my-auto items-center align-middle'>
                <span className="loading loading-spinner loading-lg h-full my-auto py-auto"></span>
            </div>
        </div>
    );
};

export default Loading;