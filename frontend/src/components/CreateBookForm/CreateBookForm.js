import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunk_getAllBooks } from "../../store/thunks/books.js";


import { AiOutlinePlus } from "react-icons/ai";




const CreateBookForm = ({ isUpdate=false, data }) => {
  const [ updateTitle, setUpdateTitle ] = useState(data.the_title);
  const [ title, setTitle ] = useState("");
  const dispatch = useDispatch();


  const onCreateSubmit = async (event) => {
    event.preventDefault();
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



  const onUpdateSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", updateTitle);

    const res = await fetch(`/api/books/${data.id}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      dispatch(thunk_getAllBooks());
    } else {
      console.log("error");
    }
  }




  if (isUpdate) {
    return (
      <>
        <div>
          <form className='' onSubmit={onUpdateSubmit}>
            <label>
              Title
          <input
                type='text'
                name="title"
                value={updateTitle}
                onChange={(event) => setUpdateTitle(event.target.value)}
              />
            </label>

            <button> <AiOutlinePlus /> </button>
          </form>
        </div>
      </>
    )
  }



  return (
    <>
    <div>
      <form className='' onSubmit={onCreateSubmit}>
        <label>
          Title
          <input
            type='text'
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>

          <button> <AiOutlinePlus/> </button>
      </form>
    </div>
    </>
  )
};

export default CreateBookForm;
