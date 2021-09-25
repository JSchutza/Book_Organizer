


import {
  GET_USERS_POLLS,
  GET_COMMENTS_BY_POLL_ID,
  DELETE_SPECIFIC_POLL,
  GET_ALL_POLLS,
  DELETE_SPECIFIC_COMMENT,
  CREATE_POLL,
  CREATE_COMMENT,
  UPDATE_COMMENT,

} from "../types";




const getUsersPolls = (polls) => ({
  type: GET_USERS_POLLS,
  polls
});



const cretatePoll = (poll) => ({
  type: CREATE_POLL,
  poll
});



const getUsersSpecificComments = (comments) => ({
  type: GET_COMMENTS_BY_POLL_ID,
  comments
});



const deleteSpecificPoll = (poll) => ({
  type: DELETE_SPECIFIC_POLL,
  poll
});



const allPolls = (polls) => ({
  type: GET_ALL_POLLS,
  polls
});



const deleteSpecificComment = (comment) => ({
  type: DELETE_SPECIFIC_COMMENT,
  comment
});



const createComment = (comment) => ({
  type: CREATE_COMMENT,
  comment
});



const updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  comment
});



export {
  getUsersPolls,
  getUsersSpecificComments,
  deleteSpecificPoll,
  allPolls,
  deleteSpecificComment,
  cretatePoll,
  createComment,


}
