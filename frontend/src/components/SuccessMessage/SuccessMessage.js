

import loadingImg from "./loading_bar.gif";
import styles from "./successmessage.module.css";


const SuccessMessage = ({ message }) => {
  return (
    <>
      <h1> {message} </h1>
      <img src={loadingImg} />
    </>
  );
};

export default SuccessMessage;
