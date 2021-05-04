
import { SET_USER, REMOVE_USER } from '../types'


const setUser = (user) => ({
  type: SET_USER,
  user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});



export {
  setUser,
  removeUser,

}
