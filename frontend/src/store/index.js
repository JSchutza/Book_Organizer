import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { usersReducer } from './reducers/session.js';
import { characterPageReducer } from "./reducers/characters.js";
import { cardLoaderReducer, singleCardReducer } from "./reducers/cardloader.js";


const rootReducer = combineReducers({
  usersReducer,
  characterPageReducer,
  cardLoaderReducer,
  singleCardReducer,

});





let enhancer;



if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk));
}




const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};




export default configureStore;