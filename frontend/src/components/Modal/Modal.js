import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal, contentModal } from '../../store/actions/modal.js';
import { BsFillBackspaceFill } from "react-icons/bs";
import LoginForm from "../LoginForm";
import SignUpForm from "../SignupForm"
import CreateCharacterForm from "../CreateCharacterForm";
import CreatePriCharForm from "../CreatePriCharForm";
import CreatePageForm from "../CreatePageForm";
import DeletePubCharButton from "../DeletePubCharButton";
import EditPubCharButton from "../EditPubCharButton";
import DeletePageButton from "../DeletePageButton";



import { showLoader } from "../../store/actions/loader.js";



import styles from "./modal.module.css";




const Modal = ({ bookId, user }) =>  {
  const dispatch = useDispatch();
  const display = useSelector(store => store.modalReducer.display);
  const content = useSelector(store => store.modalReducer.the_content);
  const data = useSelector(store => store.modalReducer.the_data)


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


        {content === "CreatePriChar" ?
          <CreatePriCharForm bookId={bookId}/>
          :
          <p></p>
        }


        {content === "CreatePage" ?
          <CreatePageForm bookId={bookId} />
          :
          <p></p>
        }

        {content === "DeletePubChar" && data ?
          <DeletePubCharButton charId={data} user={user} />
        :
        <p></p>
        }


        {content === "EditPubChar" && data ?
          <EditPubCharButton charId={data} searchId={user.search_id} />
        :
        <p></p>
        }


        {content === "DeletePage" && data ?
          <DeletePageButton bookId={bookId} pageId={data} />
        :
        <p></p>
        }

        <a href='/' onClick={event => onClose(event)}> <BsFillBackspaceFill/> </a>
    </div>
    </>
  );

};









export default Modal;
