import React, { useState } from "react";


import styles from "./tooltip.module.css"



const ToolTip = ({ children, content }) => {
  const [active, setActive] = useState(false);
  let timeout;


  const show = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, 100);
  };


  const hide = () => {
    clearInterval(timeout);
    setActive(false);
  };



  return (
    <div
      className={styles.tooltip_wrapper}
      onMouseEnter={show}
      onMouseLeave={hide}
    >

      {children}

      { active && (<div className={styles.tip}> {content} </div> ) }
    </div>
  );


};




export default ToolTip;
