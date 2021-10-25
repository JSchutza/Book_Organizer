import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";

import { RiDeleteBinFill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import Tooltip from "../ToolTip";
import ReactModal from 'react-modal';
import CreatePageForm from "../CreatePageForm";

import { thunk_getAllPages, thunk_deletePage } from "../../store/thunks/books.js";
import { useModalStyle } from "../../context/ReactModalStylesContext.js";

import { resetErrors } from '../../store/actions/errors';


import styles from "./pages.module.css";




const Pages = ({ bookId }) => {
  const [ openModal, setOpenModal ] = useState(false);
  const [ updatePayload, setUpdatePayload ] = useState(null);
  const dispatch = useDispatch();
  const pageInfo = useSelector((store) => store.pageReducer.pages);
  const { smallFormStyle } = useModalStyle();


  useEffect(() => {
    dispatch(thunk_getAllPages(bookId));
  },[dispatch, bookId]);




  const handleDelete = (event, pageId) => {
    event.preventDefault();
    dispatch(thunk_deletePage(bookId, pageId));
  }



  const handleUpdate = (event, payload) => {
    event.preventDefault();
    setUpdatePayload(payload);
    setOpenModal(true);
  }



  const closeModal = () => {
    dispatch(resetErrors());
    setOpenModal(false);
  }





  if (!pageInfo) return (<><h1>Loading Page information...</h1></>);





    return (
      <>
      <h1>Your Pages</h1>



        <ReactModal
          isOpen={openModal}
          onRequestClose={closeModal}
          style={smallFormStyle}
          appElement={document.getElementById('root')}
        >
          <CreatePageForm
            update={true}
            closeModal={closeModal}
            bookId={bookId}
            payload={updatePayload}
          />


        </ReactModal>



      <div className={styles.each_page_container}>
        {Object.values(pageInfo).length !== 0 ?
          Object.values(pageInfo).map(eachPage => (
            <>
              <NavLink to={`/books/${bookId}/pages/${eachPage.id}`} >
                <li key={eachPage.id}>
                  <h3>{eachPage.title}</h3>
                  <br />
                  <p>{eachPage.text}</p>
                </li>
              </NavLink>
              <div className={styles.each_page_button_wrap}>
                <div className={styles.each_page_delete_button}>
                  <Tooltip content={"Delete"}>
                    <NavLink to='/' onClick={event => handleDelete(event, eachPage.id)}> <RiDeleteBinFill /> </NavLink>
                  </Tooltip>
                </div>
                <div className={styles.each_page_update_button}>
                  <Tooltip content={"Update"}>
                    <NavLink to='/' onClick={event => handleUpdate(event, {
                      pageId: eachPage.id,
                      isTitle: eachPage.title,
                      isText: eachPage.text,
                      book_id: eachPage.book_id,
                    })}> <GrUpdate /> </NavLink>
                  </Tooltip>
                </div>
              </div>
            </>
          ))
        :
          <h3>You currently do not have any pages!</h3>
        }
      </div>
    </>
  )

};




export default Pages;
