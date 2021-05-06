import { ALL_CHARACTERS, SEARCH_PUB_CHARACTERS } from '../types'



const getAllCharacters = (characters) => ({
  type: ALL_CHARACTERS,
  characters
});

const searchForUsersPubChars = (characters) => ({
  type: SEARCH_PUB_CHARACTERS,
  characters
})


export {
  getAllCharacters,
  searchForUsersPubChars,

}
