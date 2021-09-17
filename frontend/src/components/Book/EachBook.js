import React, { useEffect } from 'react';
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux";
import PrivateCharacter from "../PrivateCharacters";
import Pages from "../Pages";
import ToolTip from "../ToolTip";
import { useHistory } from "react-router-dom";

import styles from "./book.module.css";

import { thunk_getAllPriChars, thunk_getAllPages } from "../../store/thunks/books.js";


// icon imports here
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsFileEarmarkPlus } from "react-icons/bs";








const EachBook = () => {
  const dispatch = useDispatch();
  const { bookId } = useParams();
  const history = useHistory();


  useEffect(() => {
    dispatch(thunk_getAllPriChars(bookId));
    dispatch(thunk_getAllPages(bookId));
  }, [dispatch, bookId])



  const handleCreateChar = event => {
    event.preventDefault();
    dispatch(dataModal({ book_id: bookId, lastpage: `/books/${bookId}` }));
    dispatch(contentModal("CreatePriChar"));
    dispatch(showModal());
    history.push("/dropdown");
  }



  const handleCreatePage = event => {
    event.preventDefault();
    dispatch(dataModal({ book_id: bookId, lastpage: `/books/${bookId}` }));
    dispatch(contentModal("CreatePage"));
    dispatch(showModal());
    history.push("/dropdown");
  }




  return (
    <>

    <div className={styles.create_wrapper}>
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
