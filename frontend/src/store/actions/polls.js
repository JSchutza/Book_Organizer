


import { GET_USERS_POLLS, GET_COMMENTS_BY_POLL_ID, DELETE_SPECIFIC_POLL } from "../types";




const getUsersPolls = (polls) => ({
  type: GET_USERS_POLLS,
  polls
});



const getUsersSpecificComments = (comments) => ({
  type: GET_COMMENTS_BY_POLL_ID,
  comments
});



const deleteSpecificPoll = (poll) => ({
  type: DELETE_SPECIFIC_POLL,
  poll
});



export {
  getUsersPolls,
  getUsersSpecificComments,
  deleteSpecificPoll,

}
