import { useEffect, useState } from 'react';
import { useHistory, useParams, NavLink } from "react-router-dom"
import { useDispatch } from "react-redux";
import PrivateCharacter from "../PrivateCharacters";
import Pages from "../Pages";
import ToolTip from "../ToolTip";
import CreatePriCharForm from "../CreatePriCharForm";
import CreatePageForm from "../CreatePageForm";

import { useModalStyle } from "../../context/ReactModalStylesContext.js";

import { thunk_getAllPriChars, thunk_getAllPages } from "../../store/thunks/books.js";
import { resetErrors } from '../../store/actions/errors';

import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsFileEarmarkPlus } from "react-icons/bs";
import ReactModal from 'react-modal';



import styles from "./book.module.css";





const EachBook = () => {
  const [ openNewCharModal, setOpenNewCharModal ] = useState(false);
  const [ openNewPageModal, setOpenNewPageModal ] = useState(false);
  const dispatch = useDispatch();
  const { bookId } = useParams();
  const { characterFormStyle, currentStyle } = useModalStyle();


  useEffect(() => {
    dispatch(thunk_getAllPriChars(bookId));
    dispatch(thunk_getAllPages(bookId));
  }, [dispatch, bookId])



  const handleCreateChar = event => {
    event.preventDefault();
    setOpenNewCharModal(true);
  };



  const handleCreatePage = event => {
    event.preventDefault();
    setOpenNewPageModal(true);
  };



  const closeNewCharModal = () => {
    dispatch(resetErrors());
    setOpenNewCharModal(false);
  };


  const closeNewPageModal = () => {
    dispatch(resetErrors());
    setOpenNewPageModal(false);
  };

  


  return (
    <>
    <div className={styles.create_wrapper}>

        <ReactModal
          isOpen={openNewCharModal}
          onRequestClose={closeNewCharModal}
          style={characterFormStyle}
          appElement={document.getElementById('root')}
        >
          <CreatePriCharForm bookId={bookId} closeModal={closeNewCharModal} />

        </ReactModal>



        <ReactModal
          isOpen={openNewPageModal}
          onRequestClose={closeNewPageModal}
          style={currentStyle}
          appElement={document.getElementById('root')}
        >
          <CreatePageForm bookId={bookId} closeModal={closeNewPageModal} />

        </ReactModal>



    <div className={styles.create_char_button}>
      <ToolTip content={"New Character"}>
        <NavLink to='/' onClick={(event) => handleCreateChar(event)}> <BsFillPersonPlusFill /> </NavLink>
      </ToolTip>
    </div>


      <div className={styles.create_page_button}>
      <ToolTip content={"New Page"}>
        <NavLink to='/' onClick={(event) => handleCreatePage(event)}> <BsFileEarmarkPlus /> </NavLink>
      </ToolTip>
    </div>
    </div>



    <div className={styles.private_char_wrap}>
      <PrivateCharacter bookId={bookId} />
    </div>



    <div className={styles.pages_wrap}>
      <Pages bookId={bookId} />
    </div>
    </>
  )
};

export default EachBook;
