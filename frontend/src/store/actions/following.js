
import { GET_WHO_THEIR_FOLLOWING, FOLLOW_OR_UNFOLLOW_TRIGGERED } from '../types'




const getFollowing = (following) => ({
  type: GET_WHO_THEIR_FOLLOWING,
  following
});


const followingOrUnfollowing = (message) =>({
  type: FOLLOW_OR_UNFOLLOW_TRIGGERED,
  message
});


export {
  getFollowing,
  followingOrUnfollowing,


}
