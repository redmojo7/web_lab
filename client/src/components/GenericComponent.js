import React from 'react';

const GenericComponent = ({ src }) => {
    
  return (
    <div className="flex-grow-1 bg-white">
      <iframe className="w-100" style={{ height: "500px" }} src={src}></iframe>
    </div>
  );
};

export default GenericComponent;
