import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { showLoader } from "./store/actions/loader.js";
import { UserProvider } from "./context/UserContext.js";



import App from "./App";
import HomeLoader from "./components/HomeLoader";


import configureStore from "./store";


import "./index.css";
import profile_pic from "./icons/Profile_Pic.jpg";


const store = configureStore();



const Loader = () => {
  const initLoader = useSelector((store) => store.loaderReducer.display);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showLoader());
  }, [dispatch]);


  if(initLoader === false) return (<p></p>);


  if (initLoader) {
    return (
      <>
        { initLoader ?
        <>
        <div>
          <div>
            <HomeLoader />
          </div>
        </div>


            <div className='profile_pic_wrap'>
              <a href='https://github.com/JSchutza' target="_blank">
                <img src={profile_pic} />
              </a>
          </div>
        </>
        :
        <p></p>
        }
      </>
    )
  }


}







ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider >
        <App />
        <Loader />
      </UserProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
