import React, { useEffect } from 'react';
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux";
import PrivateCharacter from "../PrivateCharacters";
import Pages from "../Pages";
import Modal from "../Modal";


import { thunk_getAllPriChars, thunk_getAllPages } from "../../store/thunks/books.js";
import { showModal, contentModal } from "../../store/actions/modal.js";

// icon imports here
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsFileEarmarkPlus } from "react-icons/bs";








const EachBook = () => {
  const dispatch = useDispatch();
  const { bookId } = useParams();



  useEffect(() => {
    dispatch(thunk_getAllPriChars(bookId));
    dispatch(thunk_getAllPages(bookId));
  }, [dispatch])



  const handleCreateChar = event => {
    event.preventDefault();
    dispatch(contentModal("CreatePriChar"));
    dispatch(showModal());
  }



  const handleCreatePage = event => {
    event.preventDefault();
    dispatch(contentModal("CreatePage"));
    dispatch(showModal());
  }




  return (
    <>
    <div>
        <a href='/' onClick={(event) => handleCreateChar(event)}> <BsFillPersonPlusFill/> </a>
    </div>

    <div>
        <a href='/' onClick={(event) => handleCreatePage(event)}> <BsFileEarmarkPlus/> </a>
    </div>


    <div>
      <PrivateCharacter />
    </div>

    <div>
      <Pages bookId={bookId} />
    </div>


      <Modal bookId={bookId} />
    </>
  )
};

export default EachBook;
