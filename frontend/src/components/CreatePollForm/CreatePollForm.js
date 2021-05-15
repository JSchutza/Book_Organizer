import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from "nanoid";
import { thunk_createNewPoll, thunk_updatePoll } from "../../store/thunks/polls.js";








const CreatePollForm = ({ update=false, data }) => {
  const dispatch = useDispatch();
  const [ title, setTitle ] = useState('');
  const [ questionText, setQuestionText ] = useState('');
  const [ errors, setErrors ] = useState([]);


  useEffect(() => {
    const errors = [];
    if(title.length === 0){
      errors.push("You must enter a title to create a poll.");
    }
    if(questionText.length === 0){
      errors.push("You must enter a question to create a poll.");
    }
    setErrors(errors);
  },[title, questionText]);




  const onSubmit = event => {
    event.preventDefault();
    dispatch(thunk_createNewPoll({ title, questionText }));
  }



  const onUpdate = event => {
    event.preventDefault();
    dispatch(thunk_updatePoll({ pollId: data.pollId, title, questionText }));
  }



  if(update) {
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>

            <label>
              Question
          <input
                type='text'
                name='question'
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
              />
            </label>

            <button type='submit'> Update </button>
          </form>
        </div>
      </>
    );
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
            Question
          <input
              type='text'
              name='question'
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </label>

          <button type='submit'> Create </button>
        </form>
      </div>
    </>
  );


};






export default CreatePollForm;
