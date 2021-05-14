


import { GET_USERS_POLLS, GET_COMMENTS_BY_POLL_ID } from "../types";




const getUsersPolls = (polls) => ({
  type: GET_USERS_POLLS,
  polls
});



const getUsersSpecificComments = (comments) => ({
  type: GET_COMMENTS_BY_POLL_ID,
  comments
});




export {
  getUsersPolls,
  getUsersSpecificComments,

}
