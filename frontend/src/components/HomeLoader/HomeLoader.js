
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { nextCard, resetCards, getSingleCard } from "../../store/actions/cardloader.js";

// img imports here
import {
  one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fithteen, sixteen,
  seventeen, eightteen, nineteen, twenty, twentyone, twentytwo, twentythree
} from "./index.js";




const HomeLoader = () => {
  const [ toggleSlides, setToggleSlides ] = useState(false);
  const [ clickSlides, setClickSlides ] = useState(0);
  const [ singleCard, setSingleCard ] = useState(null);

  const dispatch = useDispatch();
  const next_card = useSelector((store) => store.cardLoaderReducer.cards)
  const each_card = useSelector((store) => store.singleCardReducer.card)


  const triggerSlideShow = () => {
      dispatch(nextCard({ cards: one, cardId: 1 }))

      setTimeout(() => {
        dispatch(nextCard({ cards: two, cardId: 2 }))
      }, 1000)

      setTimeout(() => {
        dispatch(nextCard({ cards: three, cardId: 3 }))
      }, 2000)

      setTimeout(() => {
        dispatch(nextCard({ cards: four, cardId: 4 }))
      }, 3000)

      setTimeout(() => {
        dispatch(nextCard({ cards: five, cardId: 5 }))
      }, 4000)

      setTimeout(() => {
        dispatch(nextCard({ cards: six, cardId: 6 }))
      }, 5000)

      setTimeout(() => {
        dispatch(nextCard({ cards: seven, cardId: 7 }))
      }, 6000)

      setTimeout(() => {
        dispatch(nextCard({ cards: eight, cardId: 8 }))
      }, 7000)

      setTimeout(() => {
        dispatch(nextCard({ cards: nine, cardId: 9 }))
      }, 8000)

      setTimeout(() => {
        dispatch(nextCard({ cards: ten, cardId: 10 }))
      }, 9000)

      setTimeout(() => {
        dispatch(nextCard({ cards: eleven, cardId: 11 }))
      }, 10000)

      setTimeout(() => {
        dispatch(nextCard({ cards: twelve, cardId: 12 }))
      }, 11000)

      setTimeout(() => {
        dispatch(nextCard({ cards: thirteen, cardId: 13 }))
      }, 12000)

      setTimeout(() => {
        dispatch(nextCard({ cards: fourteen, cardId: 14 }))
      }, 13000)

      setTimeout(() => {
        dispatch(nextCard({ cards: fithteen, cardId: 15 }))
      }, 14000)

      setTimeout(() => {
        dispatch(nextCard({ cards: sixteen, cardId: 16 }))
      }, 15000)

      setTimeout(() => {
        dispatch(nextCard({ cards: seventeen, cardId: 17 }))
      }, 16000)

      setTimeout(() => {
        dispatch(nextCard({ cards: eightteen, cardId: 18 }))
      }, 17000)

      setTimeout(() => {
        dispatch(nextCard({ cards: nineteen, cardId: 19 }))
      }, 18000)

      setTimeout(() => {
        dispatch(nextCard({ cards: twenty, cardId: 20 }))
      }, 19000)

      setTimeout(() => {
        dispatch(nextCard({ cards: twentyone, cardId: 21 }))
      }, 20000)

      setTimeout(() => {
        dispatch(nextCard({ cards: twentytwo, cardId: 22 }))
      }, 21000)

      setTimeout(() => {
        dispatch(nextCard({ cards: twentythree, cardId: 23 }))
      }, 22000)

      setTimeout(() => {
        dispatch(resetCards())
      }, 23000)
  }



  const pauseSlideShow = (event, cardId) => {
    event.preventDefault();
    setToggleSlides(true);
    setSingleCard(cardId);

    if (cardId !== null) {
      switch (cardId) {
        case 1:
          dispatch(getSingleCard(one))
          break;
        case 2:
          dispatch(getSingleCard(two))
          break;
        case 3:
          dispatch(getSingleCard(three))
          break;
        case 4:
          dispatch(getSingleCard(four))
          break;
        case 5:
          dispatch(getSingleCard(five))
          break;
        case 6:
          dispatch(getSingleCard(six))
          break;
        case 7:
          dispatch(getSingleCard(seven))
          break;
        case 8:
          dispatch(getSingleCard(eight))
          break;
        case 9:
          dispatch(getSingleCard(nine))
          break;
        case 10:
          dispatch(getSingleCard(ten))
          break;
        case 11:
          dispatch(getSingleCard(eleven))
          break;
        case 12:
          dispatch(getSingleCard(twelve))
          break;
        case 13:
          dispatch(getSingleCard(thirteen))
          break;
        case 14:
          dispatch(getSingleCard(fourteen))
          break;
        case 15:
          dispatch(getSingleCard(fithteen))
          break;
        case 16:
          dispatch(getSingleCard(sixteen))
          break;
        case 17:
          dispatch(getSingleCard(seventeen))
          break;
        case 18:
          dispatch(getSingleCard(eightteen))
          break;
        case 19:
          dispatch(getSingleCard(nineteen))
          break;
        case 20:
          dispatch(getSingleCard(twenty))
          break;
        case 21:
          dispatch(getSingleCard(twentyone))
          break;
        case 22:
          dispatch(getSingleCard(twentytwo))
          break;
        case 23:
          dispatch(getSingleCard(twentythree))
          break;
        default:
          dispatch(getSingleCard(fithteen))
          break;
      }
    }
    // if (clickSlides === 0) {
      // setToggleSlides(true);
      // setClickSlides(1);
    // } else if (clickSlides === 1) {
      // setToggleSlides(false);
      // setClickSlides(0);
    // }
  }


  const handleClick = (event) => {
    event.preventDefault();
    setToggleSlides(false);
  }



  useEffect(() => {

  }, [singleCard]);



  if (next_card === null) {
    triggerSlideShow()
  }





  return (
    <>
    {next_card ?
    <div>
        { toggleSlides ?
        // individual card slide show view
        <div>
          {each_card ?
            <a href = '/' onClick = { (event) => handleClick(event) }>
              <img src={each_card} alt='individual card' />
            </a>
             :
              <h1> Loading... </h1>
          }
        </div>

        :
        // slide show view
          <a href='/' onClick={(event) => pauseSlideShow(event, next_card.cardId)}>
            <img src={next_card.cards} alt='slide show' />
          </a>
        }
    </div>
    :
    <h1>Loading... </h1>
    }
    </>
  )
};




export default HomeLoader;
