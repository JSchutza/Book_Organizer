import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunk_getAllBooks, thunk_getAllPriChars, thunk_getAllPages  } from "../../store/thunks/books";
import CreateBookForm from "../CreateBookForm";







const BookViewer = () => {
  const [ showBookForm, setShowBookForm ] = useState(false);
  const [ clickShowForm, setShowForm ] = useState(0);

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



  const createBookClick = event => {
    event.preventDefault();
    if (clickShowForm === 0) {
      setShowBookForm(true);
      setShowForm(1);
    } else if (clickShowForm === 1) {
      setShowBookForm(false);
      setShowForm(0);
    }
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
        <a href='/' onClick={(event) => createBookClick(event)}>
          Create
        </a>
    </div>

    <div>
        {showBookForm ?
          <CreateBookForm />
        :
          <p></p>
        }
    </div>



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
