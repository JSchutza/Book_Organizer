import { useState } from 'react';
import { useDispatch } from 'react-redux';



import { thunk_createNewPoll, thunk_updatePoll } from "../../store/thunks/polls.js";
import Errors from "../Errors";


import styles from "./createpollform.module.css";


const defaultValues = { pollId: '', isTitle: '', isQuestion: '' };


const CreatePollForm = ({ update=false, payload=defaultValues, closeModal }) => {
  const { pollId, isTitle, isQuestion } = payload;
  const [ title, setTitle ] = useState(isTitle);
  const [ questionText, setQuestionText ] = useState(isQuestion);
  const dispatch = useDispatch();











  const onSubmit = async event => {
    event.preventDefault();
    const result = await dispatch(thunk_createNewPoll({ title, questionText }));
    if (result){
      closeModal();
    }

  }




  const onUpdate = async event => {
    event.preventDefault();
    const result =  await dispatch(thunk_updatePoll({ pollId, title, questionText }));
    if (result) {
      closeModal();
    }

  }






  if(update) {
    return (
      <>
        <Errors />

        <div>
          <form className={styles.create_poll_container} onSubmit={onUpdate}>
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
      <Errors />

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
