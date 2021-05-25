import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunk_getAllBooks, thunk_getAllPriChars, thunk_getAllPages } from "../../store/thunks/books";
import { contentModal, showModal, dataModal } from "../../store/actions/modal.js";

import CreateBookForm from "../CreateBookForm";
import ToolTip from "../ToolTip";

import styles from "./bookviewer.module.css";
import LoadScreen from "../LoadScreen";
// icon imports here
import { BsFillPlusSquareFill } from "react-icons/bs";
import { RiDeleteBinFill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";







const BookViewer = () => {
  const [loading, setLoading] = useState(false);
  const [ showBookForm, setShowBookForm ] = useState(false);
  const [ clickShowForm, setShowForm ] = useState(0);


  const [ showUpdateForm, setShowUpdateForm ] = useState(false);
  const [ clickUpdateBook, setClickUpdateBook ] = useState(0);

  const [ toUpdate, setToUpdate ] = useState(null);

  const history = useHistory();
  const bookInfo = useSelector((store) => store.booksReducer.books);
  const dispatch = useDispatch();



  useEffect(() => {
    if (!loading) {
      dispatch(thunk_getAllBooks());
      setTimeout(() => {
        setLoading(true);
      }, 1000);
    }

  }, [dispatch]);



  const handleBookClick = (event, bookId) => {
    event.preventDefault();
    dispatch(thunk_getAllPriChars(bookId));
    dispatch(thunk_getAllPages(bookId));
    history.push(`/books/${bookId}`)
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


  const handleDeleteBook = (event, bookId) => {
    event.preventDefault();
    dispatch(contentModal("DeleteBook"));
    dispatch(showModal());
    dispatch(dataModal({ lastpage: '/books', bookId }));
    history.push("/dropdown");
  }



  const handleUpdate = (event, bookId) => {
    event.preventDefault();
    setToUpdate(bookInfo[bookId]);
    if(clickUpdateBook === 0) {
      setShowUpdateForm(true);
      setClickUpdateBook(1);
    } else if (clickUpdateBook === 1) {
      setShowUpdateForm(false);
      setClickUpdateBook(0);
    }
  }



  if (bookInfo === null || !loading){
    return (
      <>
        <LoadScreen />
      </>
    )
  }




  return (
    <>
      <div className={styles.bookpage_header}>
        <h1>Books</h1>
      </div>


    <div className={styles.book_create_wrapper}>
    <div className={styles.book_create_button}>
      <ToolTip content={"Create"} >
        <a href='/' onClick={(event) => createBookClick(event)}> <BsFillPlusSquareFill/> </a>
      </ToolTip>
      </div>
    </div>


    <div>
        {showBookForm ?
          <CreateBookForm />
          :
          <p></p>
        }
    </div>


    <div>
        {showUpdateForm ?
          <CreateBookForm isUpdate={true} data={toUpdate} />
        :
        <p></p>
        }
    </div>



    <div className={styles.book_link_wrapper}>
      {Object.values(bookInfo).map(eachBook => (
        <>
        <div className={styles.each_book_link}>
        <li>
            <a href='/' onClick={(event) => handleBookClick(event, eachBook.id)}>
            { eachBook.the_title }
          </a>
        </li>
        </div>



        <div className={styles.delete_update_wrap}>
          <div className={styles.delete_button}>
            <ToolTip content={"Delete"} >
              <li> <a href='/' onClick={(event) => handleDeleteBook(event, eachBook.id)}> <RiDeleteBinFill/> </a></li>
            </ToolTip>
          </div>


          <div className={styles.update_button}>
            <ToolTip content={"Update"} >
                <li> <a href='/' onClick={event => handleUpdate(event, eachBook.id)} > <GrUpdate /> </a> </li>
            </ToolTip>
          </div>
        </div>

        </>
      ))}
    </div>
    </>
  )

};



export default BookViewer;
