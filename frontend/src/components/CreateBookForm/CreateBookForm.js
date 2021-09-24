import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunk_createBook } from "../../store/thunks/books.js";

import ToolTip from "../ToolTip";
import { AiOutlinePlus } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import styles from "./createbookform.module.css";




const CreateBookForm = ({ isUpdate=false, data, closeModal }) => {
  const [ updateTitle, setUpdateTitle ] = useState(data?.the_title);
  const [ title, setTitle ] = useState("");
  const dispatch = useDispatch();



  const onCreateSubmit = event => {
    event.preventDefault();
    const payload = {
      title,
      requestUrl: "/api/books",
      requestMethod: "POST"
    };

    dispatch(thunk_createBook(payload));
    closeModal();
  }



  const onUpdateSubmit = event => {
    event.preventDefault();
    const payload = {
      title: updateTitle,
      requestUrl: `/api/books/${data.id}`,
      requestMethod: "PUT"
    };

    dispatch(thunk_createBook(payload));
    closeModal();
  }





  if (isUpdate) {
    return (
      <>
        <div className={styles.form_wrap}>
          <form onSubmit={onUpdateSubmit}>
            <label>
              Title
          <input
                type='text'
                name="title"
                value={updateTitle}
                onChange={(event) => setUpdateTitle(event.target.value)}
              />
            </label>


            <ToolTip content={"Update"}>
              <div className={styles.createbook_update_button}>
                <a href='/' onClick={(event) => onUpdateSubmit(event)}> <GrUpdate /> </a>
              </div>
            </ToolTip>
          </form>
        </div>
      </>
    )
  }



  return (
    <>
    <div className={styles.form_wrap}>
      <form onSubmit={onCreateSubmit}>
        <label>
          Title
          <input
            type='text'
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>

          <ToolTip content={"Create"}>
            <div className={styles.createbook_create_button}>
              <a href='/' onClick={(event) => onCreateSubmit(event)}> <AiOutlinePlus /> </a>
            </div>
          </ToolTip>
      </form>
    </div>
    </>
  )
};

export default CreateBookForm;
