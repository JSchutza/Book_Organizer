import { GET_WHO_THEIR_FOLLOWING, FOLLOW_OR_UNFOLLOW_TRIGGERED } from '../types'




const followingReducer = (state = { following: null, message: null }, action) => {
  switch (action.type) {
    case GET_WHO_THEIR_FOLLOWING:
      return { ...state, following: action.following };
    case FOLLOW_OR_UNFOLLOW_TRIGGERED:
      return { ...state, message: action.message };
    default:
      return state;
  }
}


export {
  followingReducer,

}
