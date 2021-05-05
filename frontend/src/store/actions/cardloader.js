

import { NEXT_CARD, RESET_CARDS, GET_SINGLE_CARD } from "../types"



const nextCard = ({ cards, cardId }) => ({
  type: NEXT_CARD,
  cards: { cards, cardId }
});

const resetCards = () => ({
  type: RESET_CARDS
});


const getSingleCard = (card) => ({
  type: GET_SINGLE_CARD,
  card
})


export {
  nextCard,
  resetCards,
  getSingleCard,

}
