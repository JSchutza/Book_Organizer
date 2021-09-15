import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ReactModal from 'react-modal';

import NavBar from "../NavBar";


import { useUser } from "../../context/UserContext.js";

import HomeLoader from "../HomeLoader";
import LoginForm from "../LoginForm";


const MainRouter = () => {
  const { isUser } = useUser();
  const [ openModal, setOpenModal ] = useState(false);
  const [ login, setLogin ] = useState(false);
  const [ signup, setSignup ] = useState(false);


  const closeModal = () => {
    setLogin(false);
    setSignup(false);
    setOpenModal(false);
  };




  // if the user IS logged in
  if (isUser) {

    return (
      <BrowserRouter>
        <NavBar />

        <Switch>
          <Route path="/" exact>
            {/* <Redirect to="/profile" /> */}
          </Route>

          <Route path="/profile" exact>
            {/* <Profile /> */}
          </Route>

          <Route path="/user/:searchId">
            {/* <EachUsersProfile /> */}
          </Route>

          <Route path="/characters" exact>
            {/* <CharacterSearch /> */}

            {/* { isSearch === null ?
            <CharacterPage />
            :
            <></>
          } */}

          </Route>

          <Route path='/books' exact>
            {/* <BookViewer /> */}
          </Route>

          <Route path='/books/:bookId' exact>
            {/* <EachBook /> */}
          </Route>

          <Route path='/polls' exact>
            {/* <Polls /> */}
          </Route>

          <Route path='/comments/:pollId' exact>
            {/* <Comments /> */}
          </Route>

          <Route>
            <h2>Page Not Found</h2>
          </Route>

        </Switch>
      </BrowserRouter>
    );
  }



  // if the user is NOT logged in
  if (isUser === null) {

    return (
      <>
        <BrowserRouter>
          <NavBar
            setOpenModal={setOpenModal}
            setLogin={setLogin}
          />

          <Switch>
            <Route path='/' exact>
                <HomeLoader />

              <ReactModal
                isOpen={openModal}
                onRequestClose={closeModal}
                appElement={document.getElementById('root')}
              >
                { login ? <LoginForm /> : <></> }
                

              </ReactModal>
            </Route>


            {/* <Route path='/' exact>
            </Route> */}


            <Route>
              <h2>Page Not Found</h2>
            </Route>

          </Switch>
        </BrowserRouter>
      </>
    );
  }


};




export default MainRouter;
