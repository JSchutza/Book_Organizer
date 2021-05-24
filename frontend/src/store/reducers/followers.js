





import { GET_USERS_FOLLOWERS, } from "../types";




const followersReducer = (state = { followers: null }, action) => {
  switch (action.type) {
    case GET_USERS_FOLLOWERS:
      return { ...action.followers };
    default:
      return state;
  }
};



export {
  followersReducer,

}
