import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReactModal from 'react-modal';

import { resetErrors } from "../../store/actions/errors.js";


import { useUser } from "../../context/UserContext.js";
import { useModalStyle } from "../../context/ReactModalStylesContext.js";


import NavBar from "../NavBar";
import Profile from "../Profile";
import EachUsersProfile from "../EachUsersProfile";
import CharacterPage from "../CharacterPage";
import BookViewer from "../BookViewer";
import { EachBook } from "../Book";
import Polls from "../Polls";
import Comments from "../Comments";
import SearchResults from "../SearchResults";
import HomeLoader from "../HomeLoader";
import LoginForm from "../LoginForm";
import SignUpForm from "../SignupForm";
import EachPage from "../EachPage";
import EachPriChar from "../EachPriChar";




const MainRouter = () => {
  const dispatch = useDispatch();
  const { isUser } = useUser();
  const { defaultStyle } = useModalStyle();
  const [ openModal, setOpenModal ] = useState(false);
  const [ login, setLogin ] = useState(false);
  const [ signup, setSignup ] = useState(false);


  const closeModal = () => {
    dispatch(resetErrors());
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
          <Route path="/profile" exact>
            <Profile />
          </Route>

          <Route path="/user/:searchId">
            <EachUsersProfile />
          </Route>

          <Route path="/characters" exact>
            <CharacterPage />
          </Route>

          <Route path="/characters/:searchId" exact>
            <SearchResults />
          </Route>

          <Route path='/books' exact>
            <BookViewer />
          </Route>

          <Route path='/books/:bookId' exact>
            <EachBook />
          </Route>

          <Route path='/polls' exact>
            <Polls />
          </Route>

          <Route path='/comments/:pollId' exact>
            <Comments />
          </Route>

          <Route path='/books/:bookId/pages/:pageId' exact>
            <EachPage />
          </Route>

          <Route path='/books/:bookId/characters/:charId' exact>
            <EachPriChar />
          </Route>

          <Route>
            <h2>Page Not Found</h2>
          </Route>

        </Switch>
      </BrowserRouter>
    );
  }





  // if the user is NOT logged in
    return (
      <>
        <BrowserRouter>
          <NavBar
            setOpenModal={setOpenModal}
            setLogin={setLogin}
            setSignup={setSignup}
          />

          <Switch>
            <Route path='/' exact>
                <HomeLoader />

              <ReactModal
                isOpen={openModal}
                onRequestClose={closeModal}
                style={defaultStyle}
                appElement={document.getElementById('root')}
              >
                { login ? <LoginForm closeModal={closeModal}  /> : <></> }
                {signup ? <SignUpForm closeModal={closeModal} /> : <></> }

              </ReactModal>
            </Route>

            <Route>
              <h2>Page Not Found</h2>
            </Route>

          </Switch>
        </BrowserRouter>
      </>
    );



};




export default MainRouter;
