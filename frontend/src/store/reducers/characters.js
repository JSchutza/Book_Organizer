
import {
  ALL_CHARACTERS, SEARCH_PUB_CHARACTERS, CLEAR_SEARCH_PUB_CHARS, DELETE_USERS_PUB_CHARS, DELETE_PUB_CHAR_SEARCH, UPDATE_PUB_CHAR
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

    case UPDATE_PUB_CHAR:
      return { ...state, characters: { ...state.characters, ...action.character } };

    default:
      return state;
  }
}






const searchCharacterPageReducer = (state = { characters: null }, action) => {
  switch (action.type) {
    case SEARCH_PUB_CHARACTERS:
      return { characters: { ...action.characters.public_characters } };

    case CLEAR_SEARCH_PUB_CHARS:
      return { characters: null };

    case DELETE_PUB_CHAR_SEARCH:
      const id = action.charId;
      delete state.characters[id];
      return { ...state, characters: { ...state.characters } };

    default:
      return state;
  }
}












export {
  characterPageReducer,
  searchCharacterPageReducer,



}
