import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBinFill } from "react-icons/ri";
import Modal from "../Modal";
import { showModal, contentModal, dataModal } from "../../store/actions/modal.js";
import { thunk_getAllPages } from "../../store/thunks/books.js";




const Pages = ({ bookId }) => {
  const dispatch = useDispatch();
  const pageInfo = useSelector((store) => store.pageReducer.pages)
  const rend = useSelector((store) => store.triggerRenderReducer.trigger);


  useEffect(() => {
    dispatch(thunk_getAllPages(bookId));
  },[dispatch, rend]);




  const handleDelete = (event, pageId) => {
    event.preventDefault();
    dispatch(contentModal("DeletePage"));
    dispatch(dataModal(pageId));
    dispatch(showModal());
  }



  if (pageInfo === undefined || pageInfo === null) {
    return (
      <>
        <h1>Loading Page information...</h1>
      </>
    )
  }




    return (
      <>
      <div>
        <h1>Your Pages</h1>
        {Object.values(pageInfo).map(eachPage => (
          <>
            <a href='/' onClick={ event => event.preventDefault() }>
              <li key={eachPage.id}>

                <h3>{eachPage.title}</h3>
                <br />
                <p>{eachPage.text}</p>

              </li>
            </a>


            <a href='/' onClick={event => handleDelete(event, eachPage.id) }> <RiDeleteBinFill /> </a>
            <Modal bookId={eachPage.book_id} />
          </>
        ))
        }
      </div>
    </>
  )

};




export default Pages;
