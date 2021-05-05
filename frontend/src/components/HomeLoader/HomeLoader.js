
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { nextCard } from "../../store/actions/cardloader.js";

// img imports here
import {
  one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fithteen, sixteen,
  seventeen, eightteen, nineteen, twenty, twentyone, twentytwo, twentythree
} from "./index.js";




const HomeLoader = () => {
  const dispatch = useDispatch();
  const next_card = useSelector((store) => store.cardLoaderReducer.cards)


  const triggerSlideShow = () => {
    dispatch(nextCard(one))

    setTimeout(() => {
      dispatch(nextCard(two))
    }, 1000)

    setTimeout(() => {
      dispatch(nextCard(three))
    }, 2000)

    setTimeout(() => {
      dispatch(nextCard(four))
    }, 3000)

    setTimeout(() => {
      dispatch(nextCard(five))
    }, 4000)

    setTimeout(() => {
      dispatch(nextCard(six))
    }, 5000)

    setTimeout(() => {
      dispatch(nextCard(seven))
    }, 6000)

    setTimeout(() => {
      dispatch(nextCard(eight))
    }, 7000)

    setTimeout(() => {
      dispatch(nextCard(nine))
    }, 8000)

    setTimeout(() => {
      dispatch(nextCard(ten))
    }, 9000)

    setTimeout(() => {
      dispatch(nextCard(eleven))
    }, 10000)

    setTimeout(() => {
      dispatch(nextCard(twelve))
    }, 11000)

    setTimeout(() => {
      dispatch(nextCard(thirteen))
    }, 12000)

    setTimeout(() => {
      dispatch(nextCard(fourteen))
    }, 13000)

    setTimeout(() => {
      dispatch(nextCard(fithteen))
    }, 14000)

    setTimeout(() => {
      dispatch(nextCard(sixteen))
    }, 15000)

    setTimeout(() => {
      dispatch(nextCard(seventeen))
    }, 16000)

    setTimeout(() => {
      dispatch(nextCard(eightteen))
    }, 17000)

    setTimeout(() => {
      dispatch(nextCard(nineteen))
    }, 18000)

    setTimeout(() => {
      dispatch(nextCard(twenty))
    }, 19000)

    setTimeout(() => {
      dispatch(nextCard(twentyone))
    }, 20000)

    setTimeout(() => {
      dispatch(nextCard(twentytwo))
    }, 21000)

    setTimeout(() => {
      dispatch(nextCard(twentythree))
    }, 22000)

    setTimeout(() => {
      dispatch(nextCard(null))
    }, 23000)

  }




  useEffect(() => {
    triggerSlideShow()
  }, []);


  if (next_card === null) {
    triggerSlideShow()
  }




  return (
    <>
      <img src={next_card} alt='slide show' />
    </>
  )
};




export default HomeLoader;
