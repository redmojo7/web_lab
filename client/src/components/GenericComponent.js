import React from 'react';

const GenericComponent = ({ src, isLoggedIn }) => {

    if (!isLoggedIn) {
        window.location.href = '/'; // Redirect to login page if not logged in
        return null; // If not logged in, return null to hide the component
    }
    
    return (
        <div className="flex-grow-1 bg-white">
            <iframe id="iframe-web" className="w-100" style={{ height: "800px" }} src={src}></iframe>
        </div>
    );
};

export default GenericComponent;
