


import {
  getUsersPolls,
  getUsersSpecificComments,
  deleteSpecificPoll,
  allPolls,
  deleteSpecificComment,
  cretatePoll,
  createComment,
  updateComment,
  updatePoll,

} from "../actions/polls.js";


import { setErrors, resetErrors } from "../actions/errors.js";





const thunk_getUsersPolls = () => async (dispatch) => {
  const response = await fetch("/api/polls", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!data.errors) {
    dispatch(resetErrors());
    dispatch(getUsersPolls(data));
    return true;
  }

  dispatch(setErrors(data.errors));

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
  if (!data.errors) {
    dispatch(resetErrors());
    dispatch(cretatePoll(data));
    return true;
  }

  dispatch(setErrors(data.errors));

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
  if (!data.errors) {
    dispatch(resetErrors());
    dispatch(updatePoll(data));
    return true;
  }

  dispatch(setErrors(data.errors));

};







const thunk_allPolls = () => async (dispatch) => {
  const response = await fetch("/api/polls/all", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!data.errors) {
    dispatch(resetErrors());
    dispatch(allPolls(data));
    return true;
  }

  dispatch(setErrors(data.errors));

};







const thunk_deleteSpecificPoll = (pollId) => async (dispatch) => {
  const response = await fetch(`/api/polls/${pollId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();
  if (!data.errors) {
    dispatch(resetErrors());
    dispatch(deleteSpecificPoll(pollId));
    return true;
  }

  dispatch(setErrors(data.errors));

};







const thunk_getUsersSpecificComments = (pollId) => async (dispatch) => {
  const response = await fetch(`/api/polls/${pollId}/comments`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!data.errors) {
    dispatch(resetErrors());
    dispatch(getUsersSpecificComments(data));
    return true;
  }

  dispatch(setErrors(data.errors));

};




//  /api/polls/:pollId/comments/:commentId
const thunk_deleteSpecificComment = (pollId, commentId) => async (dispatch) => {
  const response = await fetch(`/api/polls/${pollId}/comments/${commentId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();
  if (!data.errors) {
    dispatch(resetErrors());
    dispatch(deleteSpecificComment(commentId));
    return true;
  }

  dispatch(setErrors(data.errors));

};





// /api/polls/:pollId/comments/:commentId
const thunk_updateSpecificComment = ({ pollId, commentId, updateText }) => async (dispatch) => {
  const formData = new FormData();
  formData.append("answer_text", updateText);

  const response = await fetch(`/api/polls/${pollId}/comments/${commentId}`, {
    method: "PUT",
    body: formData,
  });

  const data = await response.json();
  if (!data.errors) {
    dispatch(resetErrors());
    dispatch(updateComment(data));
    return true;
  }

  dispatch(setErrors(data.errors));

};






// /api/polls/:pollId/comment
const thunk_createComment = ({ pollId, commentText }) => async (dispatch) => {

  const formData = new FormData();
  formData.append("answer_text", commentText);

  const response = await fetch(`/api/polls/${pollId}/comment`, {
    method: "POST",
    body: formData,
  });


  const data = await response.json();
  if (!data.errors) {
    dispatch(resetErrors());
    dispatch(createComment(data));
    return true;
  }

  dispatch(setErrors(data.errors));
  return false;

};






export {
  thunk_getUsersPolls,
  thunk_getUsersSpecificComments,
  thunk_createNewPoll,
  thunk_deleteSpecificPoll,
  thunk_allPolls,
  thunk_updatePoll,
  thunk_createComment,
  thunk_deleteSpecificComment,
  thunk_updateSpecificComment,


}
