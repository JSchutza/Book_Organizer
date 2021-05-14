import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBinFill } from "react-icons/ri";
import Tooltip from "../ToolTip";
import { showModal, contentModal, dataModal } from "../../store/actions/modal.js";
import { thunk_getAllPages } from "../../store/thunks/books.js";




const Pages = ({ bookId }) => {
  const dispatch = useDispatch();
  const pageInfo = useSelector((store) => store.pageReducer.pages)
  const rend = useSelector((store) => store.triggerRenderReducer.trigger);


  useEffect(() => {
    dispatch(thunk_getAllPages(bookId));
  },[dispatch, rend, bookId]);




  const handleDelete = (event, payload) => {
    event.preventDefault();
    dispatch(contentModal("DeletePage"));
    dispatch(dataModal(payload));
    dispatch(showModal());
  }



  const handleUpdate = (event, payload) => {
    event.preventDefault();
    dispatch(contentModal("UpdatePage"));
    dispatch(dataModal(payload));
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



          <Tooltip content={"Delete"}>
            <a href='/' onClick={event => handleDelete(event, {
              pageId: eachPage.id,
              title: eachPage.title,
              text: eachPage.text,
              book_id: eachPage.book_id

            }) }> <RiDeleteBinFill /> </a>
          </Tooltip>



            <Tooltip content={"Update"}>
            <a href='/' onClick={event => handleUpdate(event, {
              pageId: eachPage.id,
              title: eachPage.title,
              text: eachPage.text,
              book_id: eachPage.book_id

            })}> Update </a>
            </Tooltip>


          </>
        ))
      }
      </div>

    </>
  )

};




export default Pages;
