import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { nanoid } from "nanoid";


import { thunk_createNewPoll, thunk_updatePoll } from "../../store/thunks/polls.js";



import styles from "./createpollform.module.css";





const CreatePollForm = ({ update=false, payload, closeModal }) => {
  const { pollId, isTitle, isQuestion } = payload;
  const [ title, setTitle ] = useState('');
  const [ questionText, setQuestionText ] = useState('');
  const [ updateTitle, setUpdateTitle ] = useState(isTitle);
  const [ updateQuestion, setUpdateQuestion ] = useState(isQuestion);

  const [ errors, setErrors ] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();





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
    closeModal();
  }




  const onUpdate = event => {
    event.preventDefault();
    dispatch(thunk_updatePoll({ pollId, title: updateTitle, questionText: updateQuestion }));
    closeModal();
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
          <form className={styles.create_poll_container} onSubmit={onUpdate}>
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
              Question
          <input
                type='text'
                name='question'
                value={updateQuestion}
                onChange={(e) => setUpdateQuestion(e.target.value)}
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
        <form className={styles.create_poll_container} onSubmit={onSubmit}>
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
