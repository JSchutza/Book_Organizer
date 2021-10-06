import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { thunk_createBook } from "../../store/thunks/books.js";

import ToolTip from "../ToolTip";
import Errors from "../Errors";
import { AiOutlinePlus } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
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
                <NavLink to='/' onClick={(event) => onUpdateSubmit(event)}> <GrUpdate /> </NavLink>
              </div>
            </ToolTip>
          </form>
        </div>
      </>
    )
  }



  return (
    <>
      <Errors />

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
              <NavLink to='/' onClick={(event) => onCreateSubmit(event)}> <AiOutlinePlus /> </NavLink>
            </div>
          </ToolTip>
      </form>
    </div>
    </>
  )
};

export default CreateBookForm;
