import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal, contentModal } from '../../store/actions/modal.js';
import { BsFillBackspaceFill } from "react-icons/bs";
import LoginForm from "../LoginForm";
import SignUpForm from "../SignupForm"
import CreateCharacterForm from "../CreateCharacterForm";

import { showLoader } from "../../store/actions/loader.js";



import styles from "./modal.module.css";




const Modal = () =>  {
  const dispatch = useDispatch();
  const display = useSelector(store => store.modalReducer.display);
  const content = useSelector(store => store.modalReducer.the_content)



  const onClose = event => {
    event.preventDefault();
    if (content === "login" || content === "signin"){
      dispatch(contentModal(null))
      dispatch(hideModal());
      dispatch(showLoader());
    } else {
      dispatch(contentModal(null))
      dispatch(hideModal());
    }

  };



  return display &&  (
    <>
    <div className={styles.modal_background}>

        {content === "login" ?
          <div className={styles.log_in_wrap}>
            <LoginForm />
          </div>
        :
        <p> </p>
      }


        {content === "signin" ?
          <div className={styles.sign_in_wrap}>
            <SignUpForm />
          </div>
        :
        <p> </p>
        }


        {content === "CreatePubChar" ?
          <CreateCharacterForm />
        :
        <p></p>
        }

        <a href='/' onClick={event => onClose(event)}> <BsFillBackspaceFill/> </a>
    </div>
    </>
  );

};









export default Modal;
