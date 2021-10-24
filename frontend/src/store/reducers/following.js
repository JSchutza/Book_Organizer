import { GET_WHO_THEIR_FOLLOWING } from '../types'




const followingReducer = (state = { following: null }, action) => {
  switch (action.type) {
    case GET_WHO_THEIR_FOLLOWING:
      return { ...state, following: { ...action.following.following } };
    default:
      return state;
  }
}


export {
  followingReducer,

}
