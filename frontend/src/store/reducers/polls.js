


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





const pollsReducer = (state = { polls: null }, action) => {
  switch (action.type){
    case GET_USERS_POLLS:
      return { ...state, polls: { ...action.polls.polls } };

    case CREATE_POLL:
      return { ...state, polls: { ...state.polls, ...action.poll } };

    case DELETE_SPECIFIC_POLL:
      const id = action.poll
      delete state.polls[id];
      return { ...state, polls: { ...state.polls } };

    default:
      return state;
  }
};






const commentReducer = (state = { comments: null }, action) => {
  switch (action.type){
    case GET_COMMENTS_BY_POLL_ID:
      return { ...state, comments: action.comments.comments  };

    case CREATE_COMMENT:
      return { ...state, comments: { ...state.comments, ...action.comment } };

    case DELETE_SPECIFIC_COMMENT:
      const id = action.comment;
      delete state[id];
      return { ...state };

    case UPDATE_COMMENT:
      return { ...state, comments: { ...state.comments, ...action.comment } };

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
