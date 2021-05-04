import React from 'react';
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = (props) => {
  const user = useSelector((store) => store.userReducer);

  if (user === null){
    return (
      <div>
        <Redirect to="/" />
      </div>
    )
  }


  return (
    <Route {...props}>{user ? props.children : <Redirect to="/" />}</Route>
  );
};

export default ProtectedRoute;
