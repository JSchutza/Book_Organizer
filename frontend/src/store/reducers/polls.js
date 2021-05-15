


import { GET_USERS_POLLS, GET_COMMENTS_BY_POLL_ID, DELETE_SPECIFIC_POLL, GET_ALL_POLLS, DELETE_SPECIFIC_COMMENT } from "../types";





const pollsReducer = (state = { polls: null }, action) => {
  switch (action.type){
    case GET_USERS_POLLS:
      return { ...action.polls };
    case DELETE_SPECIFIC_POLL:
      const id = action.poll
      delete state[id];
      return { ...state };
    default:
      return state;
  }
};


const commentReducer = (state = { comments: null }, action) => {
  switch (action.type){
    case GET_COMMENTS_BY_POLL_ID:
      return { ...action.comments };
    case DELETE_SPECIFIC_COMMENT:
      const id = action.comment;
      delete state[id];
      return { ...state };
    default:
      return state;
  }
};



const allPollsReducer = (state = { polls: null }, action) => {
  switch (action.type){
    case GET_ALL_POLLS:
      return { ...action.polls };
    default:
      return state;
  }
}




export {
  pollsReducer,
  commentReducer,
  allPollsReducer,

}