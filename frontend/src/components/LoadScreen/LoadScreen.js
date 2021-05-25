import React from 'react';
import loadingImg from "../../icons/loading_img.gif";







const LoadScreen = () => {

  return (
      <div>
        <h1> Loading ... </h1>
        <img src={loadingImg} alt="Load screen" />
      </div>
  )

};




export default LoadScreen;
