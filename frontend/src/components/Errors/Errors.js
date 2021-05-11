import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { showLoader } from "../../store/actions/loader.js";
import { clearErrors } from "../../store/actions/session.js";




const Errors = () => {
  const errors = useSelector((store) => store.usersReducer.errors);
  const user = useSelector((store) => store.usersReducer.user);
  const dispatch = useDispatch();


  useEffect(() => {

  },[errors]);


  const handleTryAgain = event => {
    event.preventDefault();
    dispatch(clearErrors());
    dispatch(showLoader());
  }






  return (
    <>
    <div>
      {errors !== null  && user === null ?
      <>
        <div> {errors} </div>

        <div>
          <a href='/' onClick={event => handleTryAgain(event)} > Try Again </a>
        </div>
      </>

      :
      <></>
      }

    </div>

    </>
  )
};

export default Errors;
