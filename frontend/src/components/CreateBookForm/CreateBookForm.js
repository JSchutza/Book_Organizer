import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';





const CreateBookForm = () => {
  const [ title, setTitle ] = useState("");
  const dispatch = useDispatch();


  const onSubmit = event => {
    event.preventDefault();
    // dispatch thunk to make a book
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
