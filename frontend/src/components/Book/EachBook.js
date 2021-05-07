import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux";
import PrivateCharacter from "../PrivateCharacters";
import CreatePriCharForm from "../CreatePriCharForm";
import Pages from "../Pages";
import { thunk_getAllPriChars, thunk_getAllPages } from "../../store/thunks/books.js";


const EachBook = () => {
  const [ showcharform, setShowcharform ] = useState(false);
  const [ clickcreatechar, setClickCreateChar ] = useState(0);

  const dispatch = useDispatch();
  const { bookId } = useParams();


  useEffect(() => {
    dispatch(thunk_getAllPriChars(bookId));
    dispatch(thunk_getAllPages(bookId));
  }, [dispatch])



  const handleCreateChar = event => {
    event.preventDefault();
    if (clickcreatechar === 0) {
      setShowcharform(true);
      setClickCreateChar(1);
    } else if (clickcreatechar === 1) {
      setShowcharform(false);
      setClickCreateChar(0);
    }
  }





  return (
    <>
    <div>
        <a href='/' onClick={(event) => handleCreateChar(event)}> Create Character </a>
    </div>

    <div>
      <PrivateCharacter />
        {showcharform ?
          <CreatePriCharForm bookId={bookId} />
          :
          <p></p>
        }
    </div>
    <div>
      <Pages/>
    </div>
    </>
  )
};

export default EachBook;
