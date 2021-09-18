
import {
  ALL_CHARACTERS, SEARCH_PUB_CHARACTERS, CLEAR_SEARCH_PUB_CHARS, DELETE_USERS_PUB_CHARS
} from '../types'



// reducers
const characterPageReducer = (state = { characters: null }, action) => {
  switch (action.type) {
    case ALL_CHARACTERS:
      return { ...action.characters };

    case DELETE_USERS_PUB_CHARS:
      const id = action.character;
      delete state.characters[id];
      return { ...state, characters: { ...state.characters } };

    default:
      return state;
  }
}






const searchCharacterPageReducer = (state = { characters: null }, action) => {
  switch (action.type) {
    case SEARCH_PUB_CHARACTERS:
      return { ...action.characters.public_characters };

    case CLEAR_SEARCH_PUB_CHARS:
      return { characters: null };

    // case DELETE_USERS_PUB_CHARS:
    //   const id = action.character;
    //   delete state.characters[id];
    //   return { ...state };

    default:
      return state;
  }
}












export {
  characterPageReducer,
  searchCharacterPageReducer,



}
