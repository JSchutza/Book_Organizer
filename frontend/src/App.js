import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import CharacterSearch from "./components/CharacterSearch";
import CharacterPage from "./components/CharacterPage";
import HomeLoader from "./components/HomeLoader";
import Profile from "./components/Profile";
import BookViewer from "./components/BookViewer";
import { EachBook } from "./components/Book";

import { authenticate } from "./store/thunks/session.js";

import { showLoader } from "./store/actions/loader.js";



function App() {
  const dispatch = useDispatch();
  const [ loaded, setLoaded ] = useState(false);
  const user = useSelector((store) => store.usersReducer.user);
  const initLoader = useSelector((store) => store.loaderReducer.display)
  const isSearch = useSelector((store) => store.searchTriggeredReducer.search)




  useEffect(() => {
    dispatch(authenticate());
    dispatch(showLoader());
    setLoaded(true);
  }, [dispatch]);






  if (!loaded) {
    return null;
  }



  if (user === null && initLoader) {
    return (
      <BrowserRouter>
        <NavBar userStatus={false}/>

        { initLoader ?  <HomeLoader />  :  <p></p>  }
      </BrowserRouter>
    );
  }




  return (
    <BrowserRouter>
      <NavBar userStatus={true} />
        <Switch>
          <Route path="/" exact>
            <h1>Home</h1>
          </Route>


          <Route path="/profile" exact={true}>
            <h1>Profile</h1>
            <Profile />
          </Route>


          <Route path="/profile/:id">
            <h1>Each individual users profile page</h1>
          </Route>


          <Route path="/characters" exact={true}>
            <CharacterSearch user={user} />

          { isSearch === null ?
            <CharacterPage />
            :
            <p></p>
          }

          </Route>



          <Route path='/books' exact={true}>
            <BookViewer />
          </Route>


          <Route path='/books/:bookId' exact={true}>
            <EachBook />
          </Route>


        </Switch>
    </BrowserRouter>
  );
}

export default App;
