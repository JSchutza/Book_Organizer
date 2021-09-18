import {
  ALL_CHARACTERS, SEARCH_PUB_CHARACTERS, CLEAR_SEARCH_PUB_CHARS, DELETE_USERS_PUB_CHARS
} from '../types'



const getAllCharacters = (characters) => ({
  type: ALL_CHARACTERS,
  characters
});


const searchForUsersPubChars = (characters) => ({
  type: SEARCH_PUB_CHARACTERS,
  characters
});





const clearSearchResults = (characters) => ({
  type: CLEAR_SEARCH_PUB_CHARS,
  characters
});


const deleteUsersPubChars = (character) => ({
  type: DELETE_USERS_PUB_CHARS,
  character
});






export {
  getAllCharacters,
  searchForUsersPubChars,
  clearSearchResults,
  deleteUsersPubChars,



}
