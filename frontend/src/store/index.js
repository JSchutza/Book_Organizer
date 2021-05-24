import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// reducer imports here
import { errorsReducer } from "./reducers/errors.js";
import { loaderReducer } from "./reducers/loader.js";
import { modalReducer } from "./reducers/modal.js";
import { usersReducer } from './reducers/session.js';
import { characterPageReducer, searchCharacterPageReducer, searchTriggeredReducer } from "./reducers/characters.js";
import { cardLoaderReducer, singleCardReducer } from "./reducers/cardloader.js";
import { booksReducer, priCharReducer, pageReducer } from "./reducers/books.js";
import { pollsReducer, commentReducer, allPollsReducer } from "./reducers/polls.js";
import { followersReducer } from "./reducers/followers.js";
import { followingReducer } from "./reducers/following.js";


// root reducer here
const rootReducer = combineReducers({
  errorsReducer,
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
  allPollsReducer,
  followersReducer,
  followingReducer,

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
