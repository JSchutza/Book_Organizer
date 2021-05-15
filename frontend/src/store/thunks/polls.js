


import { getUsersPolls, getUsersSpecificComments, deleteSpecificPoll, allPolls } from "../actions/polls.js";
import { setErrors, resetErrors } from "../actions/errors.js";





const thunk_getUsersPolls = () => async (dispatch) => {
  const response = await fetch("/api/polls", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (data.errors) {
    dispatch(setErrors(data.errors));
    return;
  }
  dispatch(resetErrors());
  dispatch(getUsersPolls(data));
};





const thunk_createNewPoll = ({ title, questionText }) => async (dispatch) => {

  const formData = new FormData();
  formData.append("title", title);
  formData.append("question_text", questionText);


  const response = await fetch("/api/polls", {
    method: "POST",
    body: formData,
  });


  const data = await response.json();
  if (data.errors) {
    dispatch(setErrors(data.errors));
    return;
  }
  dispatch(resetErrors());
  dispatch(thunk_getUsersPolls());

};






const thunk_updatePoll = ({ pollId, title, questionText }) => async (dispatch) => {

  const formData = new FormData();
  formData.append("title", title);
  formData.append("question_text", questionText);


  const response = await fetch(`/api/polls/${pollId}`, {
    method: "PUT",
    body: formData,
  });


  const data = await response.json();
  if (data.errors) {
    dispatch(setErrors(data.errors));
    return;
  }
  dispatch(resetErrors());
  dispatch(thunk_getUsersPolls());

};



const thunk_deleteSpecificPoll = (pollId) => async (dispatch) => {
  const response = await fetch(`/api/polls/${pollId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();
  if (data.errors) {
    dispatch(setErrors(data.errors));
    return;
  }
  dispatch(resetErrors());
  dispatch(deleteSpecificPoll(pollId));
  dispatch(thunk_getUsersPolls());
};






const thunk_getUsersSpecificComments = (pollId) => async (dispatch) => {
  const response = await fetch(`/api/polls/${pollId}/comments`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (data.errors) {
    dispatch(setErrors(data.errors));
    return;
  }
  dispatch(resetErrors());
  dispatch(getUsersSpecificComments(data));
};




const thunk_allPolls = () => async (dispatch) => {
  const response = await fetch("/api/polls/all", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (data.errors) {
    dispatch(setErrors(data.errors));
    return;
  }
  dispatch(resetErrors());
  dispatch(allPolls(data));
};




export {
  thunk_getUsersPolls,
  thunk_getUsersSpecificComments,
  thunk_createNewPoll,
  thunk_deleteSpecificPoll,
  thunk_allPolls,
  thunk_updatePoll,


}
