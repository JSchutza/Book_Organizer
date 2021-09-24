import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


import { thunk_getAllBooks, thunk_getAllPriChars, thunk_getAllPages } from "../../store/thunks/books";


import CreateBookForm from "../CreateBookForm";
import ToolTip from "../ToolTip";
import LoadScreen from "../LoadScreen";

import ReactModal from 'react-modal';


import { BsFillPlusSquareFill } from "react-icons/bs";
import { RiDeleteBinFill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";



import styles from "./bookviewer.module.css";




const BookViewer = () => {
  const [ loading, setLoading ] = useState(false);
  const [ openNewBookModal, setOpenNewBookModal ] = useState(false);
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
    setOpenNewBookModal(true);
  }


  const handleDeleteBook = (event, bookId) => {
    event.preventDefault();

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




  const closeNewBookModal = () => {
    setOpenNewBookModal(false);
  }




  if (bookInfo === null || !loading) return (<LoadScreen />)




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


      <ReactModal
        isOpen={openNewBookModal}
        onRequestClose={closeNewBookModal}
        appElement={document.getElementById('root')}
      >

        <CreateBookForm closeModal={closeNewBookModal} />

      </ReactModal>



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
