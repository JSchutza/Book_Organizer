import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch, useSelector } from "react-redux";

import { UserProvider } from "./context/UserContext.js";
import { ModalStyleProvider } from './context/ReactModalStylesContext.js';


import App from "./App";



import configureStore from "./store";


import "./index.css";
import profile_pic from "./icons/Profile_Pic.jpg";


const store = configureStore();









ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider >
        <ModalStyleProvider>
          <App />
        </ModalStyleProvider>
      </UserProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
