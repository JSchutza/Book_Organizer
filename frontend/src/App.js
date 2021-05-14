import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import NavBar from "./components/NavBar";
import CharacterSearch from "./components/CharacterSearch";
import CharacterPage from "./components/CharacterPage";
import Modal from "./components/Modal";
import Errors from "./components/Errors";
import Profile from "./components/Profile";
import BookViewer from "./components/BookViewer";
import Polls from "./components/Polls";
import Comments from "./components/Comments";
import { EachBook } from "./components/Book";
import { hideLoader } from "./store/actions/loader.js";
import { hideModal } from "./store/actions/modal.js";
import { authenticate } from "./store/thunks/session.js";




function App() {
  const dispatch = useDispatch();
  const [ loaded, setLoaded ] = useState(false);
  const user = useSelector((store) => store.usersReducer.user);
  const isSearch = useSelector((store) => store.searchTriggeredReducer.search)




  useEffect(() => {
    dispatch(authenticate());
    dispatch(hideLoader());
    dispatch(hideModal());
    setLoaded(true);
  }, [dispatch]);






  if (!loaded) {
    return null;
  }



  if (user === null) {


    dispatch(hideModal());

    return (
      <>
      <BrowserRouter>
        <NavBar userStatus={false}/>
      </BrowserRouter>
      <Modal />
      <Errors />
      </>
    );
  }


if (user !== null) {

  dispatch(hideLoader());
  dispatch(hideModal());

  return (
    <BrowserRouter>
      <NavBar userStatus={true} />
      <Modal />

        <Switch>
          <Route path="/" exact>
            <Redirect to="/profile" />
          </Route>


          <Route path="/profile" exact={true}>
            <h1>Profile</h1>
            <Profile />
          </Route>


          <Route path="/profile/:id">
            <h1>Each individual users profile page</h1>
          </Route>


          <Route path="/characters" exact={true}>
            <CharacterSearch />

          { isSearch === null ?
            <CharacterPage />
            :
            <></>
          }

          </Route>



          <Route path='/books' exact={true}>
            <BookViewer />
          </Route>


          <Route path='/books/:bookId' exact={true}>
            <EachBook />
          </Route>

          <Route path='/polls' exact={true}>
            <Polls />
          </Route>

          <Route path='/comments/:pollId' exact={true}>
            <Comments />
          </Route>

        </Switch>
    </BrowserRouter>
    );
  }
}

export default App;
