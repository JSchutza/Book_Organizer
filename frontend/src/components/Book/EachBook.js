import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux";
import PrivateCharacter from "../PrivateCharacters";
import CreatePriCharForm from "../CreatePriCharForm";
import Pages from "../Pages";
import CreatePageForm from "../CreatePageForm";
import { thunk_getAllPriChars, thunk_getAllPages } from "../../store/thunks/books.js";

import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsFileEarmarkPlus } from "react-icons/bs";








const EachBook = () => {
  const [ showcharform, setShowcharform ] = useState(false);
  const [ clickcreatechar, setClickCreateChar ] = useState(0);

  const [ showpageform, setShowpageform ] = useState(false);
  const [ clickcreatepage, setClickCreatePage ] = useState(0);


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


  const handleCreatePage = event => {
    event.preventDefault();
    if (clickcreatepage === 0) {
      setShowpageform(true);
      setClickCreatePage(1);
    } else if (clickcreatepage === 1) {
      setShowpageform(false);
      setClickCreatePage(0);
    }
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
        {showcharform ?
          <CreatePriCharForm bookId={bookId} />
          :
          <p></p>
        }
    </div>

    <div>
      <Pages/>
        {showpageform ?
          <CreatePageForm bookId={bookId} />
        :
        <p></p>
        }
    </div>
    </>
  )
};

export default EachBook;
