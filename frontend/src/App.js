import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";

import { authenticate } from "./store/session";





function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const user = useSelector((store) => store.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);



  if (!loaded) {
    return null;
  }



  if (user == null) {
    // the cool card loading component will go here *****
    return (
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
  }




  return (
    <BrowserRouter>
      <NavBar />
        <Switch>
          <ProtectedRoute path="/" exact={true}>
            <h1>Home</h1>
          </ProtectedRoute>

          <ProtectedRoute path="/profile" exact={true}>
            <h1>Profile</h1>
          </ProtectedRoute>

          <ProtectedRoute path="/profile/:id">
            <h1>Each individual users profile page</h1>
          </ProtectedRoute>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
