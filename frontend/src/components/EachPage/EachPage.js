
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

import { thunk_getAllPages } from "../../store/thunks/books.js";



const EachPage = () => {
  const { bookId, pageId } = useParams();
  const pageInfo = useSelector(store => store.pageReducer.pages);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(thunk_getAllPages(bookId));
  },[dispatch]);



  return pageInfo && (
    <>
      <h3> book: {pageInfo[pageId].book_title} </h3>
      <h1> {pageInfo[pageId].title} </h1>
      <p> {pageInfo[pageId].text} </p>
    </>
  )
};

export default EachPage;
