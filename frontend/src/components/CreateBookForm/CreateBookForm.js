import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { thunk_createBook } from "../../store/thunks/books.js";

import ToolTip from "../ToolTip";
import Errors from "../Errors";
import { AiOutlinePlus } from "react-icons/ai";

import styles from "./createbookform.module.css";




const CreateBookForm = ({ isUpdate=false, data, closeModal }) => {
  const [ updateTitle, setUpdateTitle ] = useState(data?.the_title);
  const [ title, setTitle ] = useState("");
  const dispatch = useDispatch();



  const onCreateSubmit = async event => {
    event.preventDefault();
    const payload = {
      title,
      requestUrl: "/api/books",
      requestMethod: "POST"
    };

    const result = await dispatch(thunk_createBook(payload));
    if (result) {
      closeModal();
    }

  }



  const onUpdateSubmit = async event => {
    event.preventDefault();
    const payload = {
      title: updateTitle,
      requestUrl: `/api/books/${data.id}`,
      requestMethod: "PUT"
    };

    const result = await dispatch(thunk_createBook(payload));
    if (result) {
      closeModal();
    }

  };






  if (isUpdate) {
    return (
      <>
        <Errors />

          <form onSubmit={onUpdateSubmit} className={styles.form_wrap} >
            <label> Title </label>
              <input
                type='text'
                name="title"
                value={updateTitle}
                onChange={(event) => setUpdateTitle(event.target.value)}
              />


            <button> Update </button>
          </form>

      </>
    )
  }



  return (
    <>
      <Errors />

      <form onSubmit={onCreateSubmit} className={styles.form_wrap}>
        <label>Title</label>

          <input
            type='text'
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <ToolTip content={"Create"}>
            <button> <AiOutlinePlus /> </button>
          </ToolTip>
      </form>
    </>
  )
};

export default CreateBookForm;
