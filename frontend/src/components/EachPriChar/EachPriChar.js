
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { thunk_getAllPriChars } from "../../store/thunks/books.js";

import LoadScreen from "../LoadScreen";



const EachPriChar = () => {
  const { bookId, charId } = useParams();
  const dispatch = useDispatch();
  const charInfo = useSelector(store => store.priCharReducer.characters);



  useEffect(() => {
    dispatch(thunk_getAllPriChars(bookId));
  },[dispatch]);


  if (!charInfo) return (<LoadScreen />);


  return charInfo && (
    <>
      <h3> book: {charInfo[charId].book_title} </h3>
      <h1> {charInfo[charId].character_name} </h1>
      <p> {charInfo[charId].character_label} </p>
      <img src={charInfo[charId].avatar} alt='character' />
    </>
  )
};


export default EachPriChar;
