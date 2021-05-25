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
import EachUsersProfile from "./components/EachUsersProfile";
import { EachBook } from "./components/Book";
import { hideLoader } from "./store/actions/loader.js";
import { hideModal } from "./store/actions/modal.js";

import { useUser } from "./context/UserContext.js";



function App() {
  const dispatch = useDispatch();
  const [ loaded, setLoaded ] = useState(false);
  const { isUser } = useUser();
  const isSearch = useSelector((store) => store.searchTriggeredReducer.search)




  useEffect(() => {
    dispatch(hideLoader());
    dispatch(hideModal());
    setLoaded(true);
  }, [dispatch]);






  if (!loaded) {
    return null;
  }



  if (isUser === null) {
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


if (isUser !== null) {

  dispatch(hideLoader());
  dispatch(hideModal());



  return (
    <BrowserRouter>
      <NavBar userStatus={true} />


        <Switch>
          <Route path="/dropdown" exact>
            <Modal />
          </Route>

          <Route path="/" exact>
            <Redirect to="/profile" />
          </Route>


          <Route path="/profile" exact={true}>
            <Profile />
          </Route>


          <Route path="/user/:searchId">
            <EachUsersProfile />
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
