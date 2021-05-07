import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunk_getAllBooks } from "../../store/thunks/books.js";




const CreateBookForm = () => {
  const [ title, setTitle ] = useState("");
  const dispatch = useDispatch();


  const onSubmit = async (event) => {
    event.preventDefault();
    // dispatch thunk to make a book
    const formData = new FormData();
    formData.append("title", title);

    const res = await fetch("/api/books", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      dispatch(thunk_getAllBooks());
    } else {
      console.log("error");
    }

  }



  return (
    <>
    <div>
      <form className='' onSubmit={onSubmit}>
        <label>
          Title
          <input
            type='text'
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>

        <button> Create Book </button>
      </form>
    </div>
    </>
  )
};

export default CreateBookForm;
