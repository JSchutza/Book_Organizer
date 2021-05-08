import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';




const CreatePageForm = ({ bookId }) => {
  const [ title, setTitle ] = useState('');
  const [ text, setText ] = useState('');
  const [ errors, setErrors ] = useState([]);
  const history = useHistory();



  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", text);

    const res = await fetch(`/api/book/${bookId}/character`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      // call a dispatch here to rerender page?
    } else {
      console.log("error");
    }

  };



  return (
    <>
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
