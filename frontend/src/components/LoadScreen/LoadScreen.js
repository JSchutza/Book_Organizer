import React from 'react';
import loadingImg from "../../icons/loading_img.gif";
import styles from "./loadscreen.module.css";






const LoadScreen = () => {

  return (
      <div className={styles.loader_wraper}>
        <div className={styles.loader_header}>
          <h1> Loading ... </h1>
        </div>

        <div className={styles.loader_img}>
          <img src={loadingImg} alt="Load screen" />
        </div>
      </div>
  )

};




export default LoadScreen;
