import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunk_getAllBooks } from "../../store/thunks/books.js";

import ToolTip from "../ToolTip";
import { AiOutlinePlus } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import styles from "./createbookform.module.css";




const CreateBookForm = ({ isUpdate = false, data, closeModal }) => {
  const [ updateTitle, setUpdateTitle ] = useState("");
  const [ title, setTitle ] = useState("");
  const dispatch = useDispatch();



  const onCreateSubmit = async (event) => {
    event.preventDefault();
    // const formData = new FormData();
    // formData.append("title", title);

    // const res = await fetch("/api/books", {
    //   method: "POST",
    //   body: formData,
    // });

    // if (res.ok) {
    //   dispatch(thunk_getAllBooks());
    // } else {
    //   console.log("error");
    // }
    closeModal();
  }



  const onUpdateSubmit = async (event) => {
    event.preventDefault();
    // const formData = new FormData();
    // formData.append("title", updateTitle);

    // const res = await fetch(`/api/books/${data.id}`, {
    //   method: "PUT",
    //   body: formData,
    // });

    // if (res.ok) {
    //   dispatch(thunk_getAllBooks());
    // } else {
    //   console.log("error");
    // }
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
