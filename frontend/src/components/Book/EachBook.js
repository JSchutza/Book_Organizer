import { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom"
import { useDispatch } from "react-redux";
import PrivateCharacter from "../PrivateCharacters";
import Pages from "../Pages";
import ToolTip from "../ToolTip";
import CreatePriCharForm from "../CreatePriCharForm";
import CreatePageForm from "../CreatePageForm";

import { thunk_getAllPriChars, thunk_getAllPages } from "../../store/thunks/books.js";


import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsFileEarmarkPlus } from "react-icons/bs";
import ReactModal from 'react-modal';



import styles from "./book.module.css";





const EachBook = () => {
  const [ openNewCharModal, setOpenNewCharModal ] = useState(false);
  const [ openNewPageModal, setOpenNewPageModal ] = useState(false);
  const dispatch = useDispatch();
  const { bookId } = useParams();
  const history = useHistory();



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
    setOpenNewCharModal(false);
  };


  const closeNewPageModal = () => {
    setOpenNewPageModal(false);
  };



  return (
    <>
    <div className={styles.create_wrapper}>

        <ReactModal
          isOpen={openNewCharModal}
          onRequestClose={closeNewCharModal}
          appElement={document.getElementById('root')}
        >
          <CreatePriCharForm bookId={bookId} closeModal={closeNewCharModal} />

        </ReactModal>



        <ReactModal
          isOpen={openNewPageModal}
          onRequestClose={closeNewPageModal}
          appElement={document.getElementById('root')}
        >
          <CreatePageForm bookId={bookId} closeModal={closeNewPageModal} />

        </ReactModal>



    <div className={styles.create_char_button}>
      <ToolTip content={"New Character"}>
        <a href='/' onClick={(event) => handleCreateChar(event)}> <BsFillPersonPlusFill/> </a>
      </ToolTip>
    </div>


      <div className={styles.create_page_button}>
      <ToolTip content={"New Page"}>
        <a href='/' onClick={(event) => handleCreatePage(event)}> <BsFileEarmarkPlus/> </a>
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
