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

import styles from './mainrouter.module.css';



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
            <div className={styles.main_wraper} >
              <Profile />
            </div>
          </Route>

          <Route path="/user/:searchId">
            <div className={styles.main_wraper} >
              <EachUsersProfile />
            </div>
          </Route>

          <Route path="/characters" exact>
            <div className={styles.main_wraper} >
              <CharacterPage />
            </div>
          </Route>

          <Route path="/characters/:searchId" exact>
            <div className={styles.main_wraper} >
              <SearchResults />
            </div>
          </Route>

          <Route path='/books' exact>
            <div className={styles.main_wraper} >
              <BookViewer />
            </div>
          </Route>

          <Route path='/books/:bookId' exact>
            <div className={styles.main_wraper} >
              <EachBook />
            </div>
          </Route>

          <Route path='/polls' exact>
            <div className={styles.main_wraper} >
              <Polls />
            </div>
          </Route>

          <Route path='/comments/:pollId' exact>
            <div className={styles.main_wraper} >
              <Comments />
            </div>
          </Route>

          <Route path='/books/:bookId/pages/:pageId' exact>
            <div className={styles.main_wraper} >
              <EachPage />
            </div>
          </Route>

          <Route path='/books/:bookId/characters/:charId' exact>
            <div className={styles.main_wraper} >
              <EachPriChar />
            </div>
          </Route>

          <Route>
            <div className={styles.main_wraper} >
              <h2>Page Not Found</h2>
            </div>
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
