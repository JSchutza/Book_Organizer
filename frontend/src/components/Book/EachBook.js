import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux";
import PrivateCharacter from "../PrivateCharacters";
import { thunk_getAllPriChars } from "../../store/thunks/books.js";


const EachBook = () => {
  const dispatch = useDispatch();
  const { bookId } = useParams();


  useEffect(() => {
    dispatch(thunk_getAllPriChars(bookId))
  }, [dispatch])



  return (
    <>
    <div>
        <PrivateCharacter />
    </div>
    </>
  )
};

export default EachBook;
