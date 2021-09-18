import {
  ALL_CHARACTERS, SEARCH_PUB_CHARACTERS, CLEAR_SEARCH_PUB_CHARS, DELETE_USERS_PUB_CHARS, DELETE_PUB_CHAR_SEARCH, UPDATE_PUB_CHAR
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




const deleteSearchPubChar = (charId) => ({
  type: DELETE_PUB_CHAR_SEARCH,
  charId
});



const updatePubChar = (character) => ({
  type: UPDATE_PUB_CHAR,
  character
});




export {
  getAllCharacters,
  searchForUsersPubChars,
  clearSearchResults,
  deleteUsersPubChars,
  deleteSearchPubChar,
  updatePubChar,


}
