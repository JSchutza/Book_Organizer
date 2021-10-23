import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';


import { thunk_getAllBooks, thunk_getAllPriChars, thunk_getAllPages } from "../../store/thunks/books";
import { thunk_deleteBook } from "../../store/thunks/books";
import { resetErrors } from '../../store/actions/errors';

import { useModalStyle } from "../../context/ReactModalStylesContext.js";


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
  const [ openUpdateBookModal, setOpenUpdateBookModal ] = useState(false);
  const [ toUpdate, setToUpdate ] = useState(null);

  const history = useHistory();
  const bookInfo = useSelector((store) => store.booksReducer.books);
  const dispatch = useDispatch();
  const { smallFormStyle } = useModalStyle();


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
    dispatch(thunk_deleteBook(bookId));
  }



  const handleUpdate = (event, bookId) => {
    event.preventDefault();
    setToUpdate(bookInfo[bookId]);
    setOpenUpdateBookModal(true);
  }




  const closeNewBookModal = () => {
    dispatch(resetErrors());
    setOpenNewBookModal(false);
  }



  const closeUpdateBookModal = () => {
    dispatch(resetErrors());
    setOpenUpdateBookModal(false);
  }








  if (!bookInfo || !loading) return (<LoadScreen />)




  return (
    <>
      <div className={styles.bookpage_header}>
        <h1>Books</h1>
      </div>


    <div className={styles.book_create_wrapper}>
    <div className={styles.book_create_button}>
      <ToolTip content={"Create"} >
        <NavLink to='/' onClick={(event) => createBookClick(event)}> <BsFillPlusSquareFill /> </NavLink>
      </ToolTip>
      </div>
    </div>


      <ReactModal
        isOpen={openNewBookModal}
        onRequestClose={closeNewBookModal}
        style={smallFormStyle}
        appElement={document.getElementById('root')}
      >

        <CreateBookForm closeModal={closeNewBookModal} />

      </ReactModal>



      <ReactModal
        isOpen={openUpdateBookModal}
        onRequestClose={closeUpdateBookModal}
        style={smallFormStyle}
        appElement={document.getElementById('root')}
      >

        <CreateBookForm
          isUpdate={true}
          data={toUpdate}
          closeModal={closeUpdateBookModal}
        />
      </ReactModal>


    {/* if the books data is empty */}
    {Object.values(bookInfo).length === 0 ?
      <h1>You currently do not have any books!</h1>
      :
      null
    }


    <div className={styles.book_link_wrapper}>
      {Object.values(bookInfo).map(eachBook => (
        <>
        <div className={styles.each_book_link}>
        <li>
          <NavLink to='/' onClick={(event) => handleBookClick(event, eachBook.id)}> { eachBook.the_title } </NavLink>
        </li>
        </div>



        <div className={styles.delete_update_wrap}>
          <div className={styles.delete_button}>
            <ToolTip content={"Delete"} >
              <li> <NavLink to='/' onClick={(event) => handleDeleteBook(event, eachBook.id)}> <RiDeleteBinFill /> </NavLink></li>
            </ToolTip>
          </div>


          <div className={styles.update_button}>
            <ToolTip content={"Update"} >
              <li> <NavLink to='/' onClick={event => handleUpdate(event, eachBook.id)} > <GrUpdate /> </NavLink> </li>
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
