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
import CreatePollForm from "../CreatePollForm";
import ToolTip from "../ToolTip";

import { showLoader } from "../../store/actions/loader.js";
import { useHistory } from "react-router-dom";



import styles from "./modal.module.css";




const Modal = () =>  {
  const dispatch = useDispatch();
  const display = useSelector(store => store.modalReducer.display);
  const content = useSelector(store => store.modalReducer.the_content);
  const data = useSelector(store => store.modalReducer.the_data)
  const history = useHistory();

  const onClose = event => {
    event.preventDefault();
    if (content === "login" || content === "signin"){
      dispatch(contentModal(null))
      dispatch(hideModal());
      dispatch(showLoader());
    } else {
      dispatch(contentModal(null))
      dispatch(hideModal());
      history.push(`${data.lastpage}`);

      if (data === null) return;
      if(data.setIsHidden){
        data.setIsHidden("");
      }
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
        <div className={styles.create_pub_char_form}>
            <CreateCharacterForm data={data} />
        </div>
        :
          <></>
        }


        {content === "CreatePriChar" && data ?
        <div className={styles.create_pri_char_form}>
          <CreatePriCharForm bookId={data.book_id}/>
        </div>
          :
          <></>
        }


        {content === "UpdatePriChar" && data ?
          <div className={styles.create_pri_char_form}>
            <CreatePriCharForm bookId={data.book_id} update={true} data={data} />
          </div>
        :
          <></>
        }


        {content === "CreatePage" && data?
        <div className={styles.create_page_form}>
          <CreatePageForm bookId={data.book_id} />
        </div>
          :
          <></>
        }


        {content === "UpdatePage" && data?
          <div className={styles.create_page_form}>
            <CreatePageForm bookId={data.book_id} update={true} data={data} />
          </div>
          :
          <></>
        }


        {content === "DeletePubChar" && data ?
          <div className={styles.delete_prompt}>
            <DeletePubCharButton charId={data.charId} search_id={data.search_id} data={data} />
          </div>
        :
          <></>
        }


        {content === "EditPubChar" && data ?
          <div className={styles.create_pub_char_form}>
          <EditPubCharButton charId={data.charId} search_id={data.search_id} data={data}/>
          </div>
        :
          <></>
        }


        {content === "DeletePage" && data ?
          <div className={styles.delete_prompt}>
          <DeletePageButton bookId={data.book_id} pageId={data.pageId} />
          </div>
        :
          <></>
        }


        {content === "DeletePriChar" && data ?
        <div className={styles.delete_prompt}>
          <DeletePriCharButton bookId={data.book_id} charId={data.charId} />
        </div>
        :
          <></>
        }

        {content === "CreatePoll" ?
          <div className={styles.create_poll_form}>
            <CreatePollForm />
          </div>
          :
          <></>
        }

        {content === "UpdatePoll" ?
          <div className={styles.create_poll_form}>
            <CreatePollForm update={true} data={data} />
          </div>
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
