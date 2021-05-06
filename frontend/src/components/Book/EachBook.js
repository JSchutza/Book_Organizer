import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux";
import PrivateCharacter from "../PrivateCharacters";
import Pages from "../Pages";
import { thunk_getAllPriChars, thunk_getAllPages } from "../../store/thunks/books.js";


const EachBook = () => {
  const dispatch = useDispatch();
  const { bookId } = useParams();


  useEffect(() => {
    dispatch(thunk_getAllPriChars(bookId));
    dispatch(thunk_getAllPages(bookId));
  }, [dispatch])



  return (
    <>
    <div>
      <PrivateCharacter />
    </div>
    <div>
      <Pages/>
    </div>
    </>
  )
};

export default EachBook;
