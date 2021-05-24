
import { getFollowing, followingOrUnfollowing } from "../actions/following.js";
import { setErrors, resetErrors } from "../actions/errors.js";


// /api/users/following
const thunk_getFollowing = () => async (dispatch) => {
  const response = await fetch("/api/users/following", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (data.errors) {
    dispatch(setErrors(data.errors));
    return;
  }
  dispatch(resetErrors());
  dispatch(getFollowing(data));
}



// /api/users/:userId/following
const thunk_followOrUnfollow = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/following`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const data = await response.json();
  if (data.errors) {
    dispatch(setErrors(data.errors));
    return;
  }

  dispatch(resetErrors());
  dispatch(followingOrUnfollowing(data.message));
  dispatch(thunk_getFollowing());

}







export {
  thunk_getFollowing,
  thunk_followOrUnfollow,



}
