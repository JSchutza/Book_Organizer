import { ALL_CHARACTERS, SEARCH_PUB_CHARACTERS, SEARCH_TRIGGERED } from '../types'



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



export {
  getAllCharacters,
  searchForUsersPubChars,
  searchTriggered,


}
