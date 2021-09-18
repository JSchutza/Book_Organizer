// constants
// session
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const VALIDATION_ERRORS = "session/VALIDATION_ERRORS";
const CLEAR_ERRORS = "session/CLEAR_ERRORS";
const USER_SEARCH = "session/USER_SEARCH";





// pub characters
const ALL_CHARACTERS = "characters/ALL_CHARACTERS"
const SEARCH_PUB_CHARACTERS = "characters/SEARCH_PUB_CHARACTERS";
const CLEAR_SEARCH_PUB_CHARS = "characters/CLEAR_SEARCH_PUB_CHARS";
const DELETE_USERS_PUB_CHARS = "characters/DELETE_USERS_PUB_CHARS";




// books
const GET_USERS_BOOKS = "books/GET_USERS_BOOKS";
const DELETE_BOOK = "books/DELETE_BOOK";


// pages
const GET_USERS_PAGES = "books/GET_USERS_PAGES";
const DELETE_USERS_PAGE = 'books/DELETE_USERS_PAGE';



// pri characters
const GET_USERS_PRI_CHARS = "books/GET_USERS_PRI_CHARS";
const DELETE_USERS_PRI_CHARS = 'characters/DELETE_USERS_PRI_CHARS'



// polls
const GET_USERS_POLLS = 'polls/GET_USERS_POLLS';
const GET_COMMENTS_BY_POLL_ID = 'polls/GET_COMMENTS_BY_POLL_ID';
const DELETE_SPECIFIC_POLL = 'polls/DELETE_SPECIFIC_POLL';
const GET_ALL_POLLS = 'polls/GET_ALL_POLLS';
const DELETE_SPECIFIC_COMMENT = 'polls/DELETE_SPECIFIC_COMMENT';




// followers
const GET_USERS_FOLLOWERS = 'followers/GET_USERS_FOLLOWERS';


// following
const GET_WHO_THEIR_FOLLOWING = 'following/GET_WHO_THEIR_FOLLOWING';
const FOLLOW_OR_UNFOLLOW_TRIGGERED = 'following/FOLLOW_OR_UNFOLLOW_TRIGGERED';



// general errors for after they are logged in
const SET_ERRORS = "errors/SET_ERRORS";
const RESET_ERRORS = "errors/RESET_ERRORS";







export {
  SET_USER,
  REMOVE_USER,
  VALIDATION_ERRORS,
  CLEAR_ERRORS,
  ALL_CHARACTERS,
  SEARCH_PUB_CHARACTERS,
  CLEAR_SEARCH_PUB_CHARS,
  DELETE_USERS_PUB_CHARS,
  GET_USERS_BOOKS,
  GET_USERS_PRI_CHARS,
  GET_USERS_PAGES,
  DELETE_BOOK,
  DELETE_USERS_PRI_CHARS,
  DELETE_USERS_PAGE,
  SET_ERRORS,
  RESET_ERRORS,
  GET_USERS_POLLS,
  GET_COMMENTS_BY_POLL_ID,
  DELETE_SPECIFIC_POLL,
  GET_ALL_POLLS,
  DELETE_SPECIFIC_COMMENT,
  USER_SEARCH,
  GET_USERS_FOLLOWERS,
  GET_WHO_THEIR_FOLLOWING,
  FOLLOW_OR_UNFOLLOW_TRIGGERED,







}
