import React, { useState } from 'react'
import  "./rotate.scss"

const Rotate = () => {

  const [startX, setStartX] = useState(0);
  const [rotation, setRotation] = useState(0);

  const handleMouseDown = (e) => {
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (startX !== 0) {
      const diff = e.clientX - startX;
      setRotation(diff);
    }
  };

  const handleMouseUp = () => {
    setStartX(0);
  };

  return (
    <div
      className="image-container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className="image"
        style={{ transform: `rotateY(${rotation}deg)` }}
      >
  <img src="https://firebasestorage.googleapis.com/v0/b/mjcollections-481d5.appspot.com/o/1684503517950photo13.png?alt=media&token=4dddd157-99a6-4929-abb8-326c0858d555" alt="Image"/>
      </div>
    </div>
  );
  return (
<div class="image-container">
</div>  
  )
}

export default Rotate