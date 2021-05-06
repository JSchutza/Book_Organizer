import { ALL_CHARACTERS, SEARCH_PUB_CHARACTERS, SEARCH_TRIGGERED, CLEAR_SEARCH_PUB_CHARS } from '../types'



const getAllCharacters = (characters) => ({
  type: ALL_CHARACTERS,
  characters
});


const searchForUsersPubChars = (characters) => ({
  type: SEARCH_PUB_CHARACTERS,
  characters
});



const searchTriggered = (search) => ({
  type: SEARCH_TRIGGERED,
  search
});


const clearSearchResults = (characters) => ({
  type: CLEAR_SEARCH_PUB_CHARS,
  characters
});







export {
  getAllCharacters,
  searchForUsersPubChars,
  searchTriggered,
  clearSearchResults,


}
