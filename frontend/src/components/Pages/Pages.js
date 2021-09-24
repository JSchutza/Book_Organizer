import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBinFill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import { useHistory } from "react-router-dom";
import Tooltip from "../ToolTip";

import { thunk_getAllPages } from "../../store/thunks/books.js";
import styles from "./pages.module.css";








const Pages = ({ bookId }) => {
  const dispatch = useDispatch();
  const pageInfo = useSelector((store) => store.pageReducer.pages)
  const history = useHistory();

  useEffect(() => {
    dispatch(thunk_getAllPages(bookId));
  },[dispatch, bookId]);




  const handleDelete = (event, payload) => {
    event.preventDefault();

    history.push("/dropdown");
  }



  const handleUpdate = (event, payload) => {
    event.preventDefault();

    history.push("/dropdown");
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
        <h1>Your Pages</h1>
      <div className={styles.each_page_container}>
        {Object.values(pageInfo).map(eachPage => (
          <>
            <a href='/' onClick={ event => event.preventDefault() }>
              <li key={eachPage.id}>

                <h3>{eachPage.title}</h3>
                <br />
                <p>{eachPage.text}</p>

              </li>
            </a>


          <div className={styles.each_page_button_wrap}>
          <div className={styles.each_page_delete_button}>
          <Tooltip content={"Delete"}>
            <a href='/' onClick={event => handleDelete(event, {
              pageId: eachPage.id,
              title: eachPage.title,
              text: eachPage.text,
              book_id: eachPage.book_id,
              lastpage: `/books/${bookId}`

            }) }> <RiDeleteBinFill /> </a>
          </Tooltip>
          </div>



            <div className={styles.each_page_update_button}>
            <Tooltip content={"Update"}>
            <a href='/' onClick={event => handleUpdate(event, {
              pageId: eachPage.id,
              title: eachPage.title,
              text: eachPage.text,
              book_id: eachPage.book_id,
              lastpage: `/books/${bookId}`

            })}> <GrUpdate /> </a>
            </Tooltip>
            </div>
            </div>


          </>
        ))
      }
      </div>

    </>
  )

};




export default Pages;
