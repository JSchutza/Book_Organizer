import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import CharacterPage from "./components/CharacterPage";
import HomeLoader from "./components/HomeLoader";


import { authenticate } from "./store/thunks/session.js";





function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const user = useSelector((store) => store.usersReducer.user);

  useEffect(() => {
      dispatch(authenticate());
      setLoaded(true);
  }, [dispatch]);



  if (!loaded) {
    return null;
  }



  if (user === null) {
    // the cool card loading component will go here *****
    return (
      <BrowserRouter>
        <NavBar userStatus={false} />
        <HomeLoader />
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
          </Route>

          <Route path="/profile/:id">
            <h1>Each individual users profile page</h1>
          </Route>

          <Route path="/characters" exact={true}>
            <CharacterPage />
          </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
