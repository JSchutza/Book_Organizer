import { useState } from 'react';
import { useDispatch } from "react-redux";

import { thunk_updatePage, thunk_createPage } from "../../store/thunks/books.js";
import { resetErrors } from '../../store/actions/errors.js';

import { nanoid } from "nanoid"

import Errors from "../Errors";

import styles from "./createpageform.module.css";

const defaultValues = { pageId: '', isTitle: '', isText: '', book_id: '' };



const CreatePageForm = ({ bookId, update=false, payload=defaultValues, closeModal }) => {
  const { pageId, isTitle, isText, book_id } = payload;
  const [ title, setTitle ] = useState(isTitle);
  const [ text, setText ] = useState(isText);
  const [ errors, setErrors ] = useState([]);
  const dispatch = useDispatch();






  const onSubmit = async event => {
    event.preventDefault();
    const result = await dispatch(thunk_createPage({ title, text, bookId }));
    if(result) {
      closeModal();
    }

  };


  const onUpdate = event => {
    event.preventDefault();
    dispatch(thunk_updatePage({ title, text, bookId: book_id, pageId }));
    closeModal();
  }





  if (update) {
    return (
      <>



        <div>
          <form className={styles.create_page_container} onSubmit={onUpdate}>
            <label>
              Title
            <input
                type='text'
                name='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>

            <label>
              Text
            <input
                type='text'
                name='text'
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </label>

            <button type='submit'> Update </button>
          </form>
        </div>
      </>
    )
  }



  return (
    <>
      <Errors />

      <div>
        <form className={styles.create_page_container} onSubmit={onSubmit}>
          <label>
            Title
          <input
              type='text'
              name='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label>
            Text
          <input
              type='text'
              name='text'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>

          <button type='submit'> Create </button>
        </form>
      </div>
    </>
  )
};



export default CreatePageForm;
