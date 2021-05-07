import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunk_getAllBooks, thunk_getAllPriChars, thunk_getAllPages  } from "../../store/thunks/books";








const BookViewer = () => {
  const bookInfo = useSelector((store) => store.booksReducer.books);
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(thunk_getAllBooks());
  },[dispatch]);


  const handleBookClick = (event, bookId) => {
    event.preventDefault();
    dispatch(thunk_getAllPriChars(bookId));
    dispatch(thunk_getAllPages(bookId));
  }


  if (bookInfo === null){
    return (
      <div>
        <h1>Loading books ... </h1>
      </div>
    )
  }




  return (
    <>
    <div>
      {Object.values(bookInfo).map(eachBook => (
        <>
        <li>
            <a href='/' onClick={(event) => handleBookClick(event, eachBook.id)}>
            { eachBook.the_title }
          </a>
        </li>
        </>
      ))}
    </div>
    </>
  )

};



export default BookViewer;
