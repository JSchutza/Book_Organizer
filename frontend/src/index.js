import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { showLoader } from "./store/actions/loader.js";

import App from "./App";
import HomeLoader from "./components/HomeLoader";

import configureStore from "./store";


import "./index.css";



const store = configureStore();



const Loader = () => {
  const initLoader = useSelector((store) => store.loaderReducer.display);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showLoader());
  }, [dispatch]);


  if(initLoader === false) return (<p></p>);


  if (initLoader) {
    return (
      <>
        { initLoader ?  <HomeLoader />  :  <p></p>  }
      </>
    )
  }


}






ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Loader />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
