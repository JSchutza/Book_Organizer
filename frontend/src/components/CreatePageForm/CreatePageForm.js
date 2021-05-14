import React, { useState, useEffect } from 'react';
import { hideModal } from "../../store/actions/modal.js";
import { thunk_getAllPages } from "../../store/thunks/books.js";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid"


const CreatePageForm = ({ bookId, update=false, data }) => {
  const [ title, setTitle ] = useState('');
  const [ text, setText ] = useState('');
  const [ updateTitle, setUpdateTitle ] = useState('');
  const [ updateText, setUpdateText ] = useState('');
  const [ errors, setErrors ] = useState([]);
  const dispatch = useDispatch();



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







  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", text);

    const res = await fetch(`/api/book/${bookId}/page`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      dispatch(thunk_getAllPages(bookId));
      dispatch(hideModal());
    } else {
      console.log("error");
    }

  };


  const onUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", updateTitle);
    formData.append("text", updateText);

    const res = await fetch(`/api/book/${bookId}/page/${data.pageId}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      dispatch(thunk_getAllPages(bookId));
      dispatch(hideModal());
    } else {
      console.log("error");
    }
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
          <form className='' onSubmit={onUpdate}>
            <label>
              Title
            <input
                type='text'
                name='title'
                value={updateTitle}
                onChange={(e) => setUpdateTitle(e.target.value)}
              />
            </label>

            <label>
              Text
            <input
                type='text'
                name='text'
                value={updateText}
                onChange={(e) => setUpdateText(e.target.value)}
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
        <form className='' onSubmit={onSubmit}>
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
