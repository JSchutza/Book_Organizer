import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// reducer imports here
import { errorsReducer } from "./reducers/errors.js";
import { triggerRenderReducer } from "./reducers/render.js";
import { loaderReducer } from "./reducers/loader.js";
import { modalReducer } from "./reducers/modal.js";
import { usersReducer } from './reducers/session.js';
import { characterPageReducer, searchCharacterPageReducer, searchTriggeredReducer } from "./reducers/characters.js";
import { cardLoaderReducer, singleCardReducer } from "./reducers/cardloader.js";
import { booksReducer, priCharReducer, pageReducer } from "./reducers/books.js";
import { pollsReducer, commentReducer } from "./reducers/polls.js";



// root reducer here
const rootReducer = combineReducers({
  errorsReducer,
  triggerRenderReducer,
  loaderReducer,
  modalReducer,
  usersReducer,
  characterPageReducer,
  cardLoaderReducer,
  singleCardReducer,
  searchCharacterPageReducer,
  searchTriggeredReducer,
  booksReducer,
  priCharReducer,
  pageReducer,
  pollsReducer,
  commentReducer,

});





let enhancer;



if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk));
}




const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};




export default configureStore;
