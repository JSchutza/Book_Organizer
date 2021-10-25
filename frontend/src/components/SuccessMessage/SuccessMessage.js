

import loadingImg from "./loading_bar.gif";
import styles from "./successmessage.module.css";


const SuccessMessage = ({ message }) => {
  return (
    <div className={styles.success_wrap} >
      <h1> {message} </h1>
      <img src={loadingImg} />
    </div>
  );
};

export default SuccessMessage;
