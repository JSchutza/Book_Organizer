



import { ALL_CHARACTERS, SEARCH_PUB_CHARACTERS, SEARCH_TRIGGERED } from '../types'




// reducers
const characterPageReducer = (state = { characters: null }, action) => {
  switch (action.type) {
    case ALL_CHARACTERS:
      return { ...action.characters };
    default:
      return state;
  }
}


const searchCharacterPageReducer = (state = { characters: null }, action) => {
  switch (action.type) {
    case SEARCH_PUB_CHARACTERS:
      return { ...action.characters.public_characters };
    default:
      return state;
  }
}


const searchTriggeredReducer = (state = { search: null }, action) => {
  switch (action.type) {
    case SEARCH_TRIGGERED:
      return { ...action.search }
    default:
      return state;
  }
}



export {
  characterPageReducer,
  searchCharacterPageReducer,
  searchTriggeredReducer,


}
