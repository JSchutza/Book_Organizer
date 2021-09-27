import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";


import { nanoid } from "nanoid"
import { thunk_updatePage, thunk_createPage } from "../../store/thunks/books.js";



import styles from "./createpageform.module.css";

const defaultValues = { pageId: '', isTitle: '', isText: '', book_id: '' };



const CreatePageForm = ({ bookId, update=false, payload=defaultValues, closeModal }) => {
  const { pageId, isTitle, isText, book_id } = payload;
  const [ title, setTitle ] = useState(isTitle);
  const [ text, setText ] = useState(isText);
  const [ errors, setErrors ] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
    const errors = []
    if(title.length === 0){
      errors.push("You must have a title to create a page.")
    }
    if(text.length === 0) {
      errors.push("You must have text to create a page.")
    }
    setErrors(errors);
  },[title, text]);




  const onSubmit = event => {
    event.preventDefault();
    dispatch(thunk_createPage({ title, text, bookId }));
    closeModal();
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
          {errors.map(each => (
            <li key={nanoid()}> {each} </li>
          ))}
        </div>


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
      <div>
        {errors.map(each => (
          <li key={nanoid()}> {each} </li>
        ))}
      </div>

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
