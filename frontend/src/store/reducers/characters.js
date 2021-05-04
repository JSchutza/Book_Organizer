



import { ALL_CHARACTERS } from '../types'




// reducers
const characterPageReducer = (state = { characters: null }, action) => {
  switch (action.type) {
    case ALL_CHARACTERS:
      return { ...action.characters };
    default:
      return state;
  }
}






export {
  characterPageReducer,

}
