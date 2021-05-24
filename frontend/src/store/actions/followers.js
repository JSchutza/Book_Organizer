

import { GET_USERS_FOLLOWERS,  } from "../types";




const getUsersFollowers = (followers) => ({
  type: GET_USERS_FOLLOWERS,
  followers
});



export {
  getUsersFollowers,


}
