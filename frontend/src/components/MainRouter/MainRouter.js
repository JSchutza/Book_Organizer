
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { useUser } from "../../context/UserContext.js";





const MainRouter = () => {
  const { isUser } = useUser();

  // if the user is NOT logged in
  if (isUser === null) {

    return (
      <>
        <BrowserRouter>
          {/* <NavBar userStatus={false} /> */}
        </BrowserRouter>
      </>
    );
  }


  // if the user IS logged in
  if (isUser !== null) {

    return (
      <BrowserRouter>
        {/* <NavBar userStatus={true} /> */}

        <Switch>

          <Route path="/" exact>
            {/* <Redirect to="/profile" /> */}
          </Route>


          <Route path="/profile" exact={true}>
            {/* <Profile /> */}
          </Route>


          <Route path="/user/:searchId">
            {/* <EachUsersProfile /> */}
          </Route>


          <Route path="/characters" exact={true}>
            {/* <CharacterSearch /> */}

            {/* { isSearch === null ?
            <CharacterPage />
            :
            <></>
          } */}

          </Route>



          <Route path='/books' exact={true}>
            {/* <BookViewer /> */}
          </Route>


          <Route path='/books/:bookId' exact={true}>
            {/* <EachBook /> */}
          </Route>

          <Route path='/polls' exact={true}>
            {/* <Polls /> */}
          </Route>

          <Route path='/comments/:pollId' exact={true}>
            {/* <Comments /> */}
          </Route>

        </Switch>
      </BrowserRouter>
    );
  }
};

export default MainRouter;
