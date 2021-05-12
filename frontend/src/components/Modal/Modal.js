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
import DeletePriCharButton from "../DeletePriCharButton";
import ToolTip from "../ToolTip";

import { showLoader } from "../../store/actions/loader.js";



import styles from "./modal.module.css";




const Modal = ({ user }) =>  {
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
        <></>
      }


        {content === "signin" ?
          <div className={styles.sign_in_wrap}>
            <SignUpForm />
          </div>
        :
          <></>
        }


        {content === "CreatePubChar" ?
          <CreateCharacterForm />
        :
          <></>
        }


        {content === "CreatePriChar" && data ?
          <CreatePriCharForm bookId={data.book_id}/>
          :
          <></>
        }


        {content === "UpdatePriChar" && data ?
          <CreatePriCharForm bookId={data.book_id} update={true} data={data} />
        :
          <></>
        }


        {content === "CreatePage" && data?
          <CreatePageForm bookId={data.book_id} />
          :
          <></>
        }


        {content === "UpdatePage" && data?
          <CreatePageForm bookId={data.book_id} update={true} data={data} />
          :
          <></>
        }


        {content === "DeletePubChar" && data ?
          <DeletePubCharButton charId={data.charId} search_id={data.search_id} />
        :
          <></>
        }


        {content === "EditPubChar" && data ?
          <EditPubCharButton charId={data.charId} search_id={data.search_id} />
        :
          <></>
        }


        {content === "DeletePage" && data ?
          <DeletePageButton bookId={data.book_id} pageId={data.pageId} />
        :
          <></>
        }


        {content === "DeletePriChar" && data ?
          <DeletePriCharButton bookId={data.book_id} charId={data.charId} />
        :
          <></>
        }


        <div className={styles.modal_exit_button}>
        <ToolTip content={"Close"} >
          <a href='/' onClick={event => onClose(event)}> <BsFillBackspaceFill/> </a>
        </ToolTip>
        </div>

    </div>
    </>
  );

};









export default Modal;
