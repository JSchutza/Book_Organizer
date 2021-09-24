import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { clearErrors } from "../../store/actions/session.js";
import styles from "./errors.module.css";



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
      {errors !== null  && user === null ?
      <>
      <div className={styles.errors}>
          <div> <p> {errors} </p> </div>

        <div>
          <a href='/' onClick={event => handleTryAgain(event)} > Try Again </a>
        </div>
      </div>
      </>

      :
      <></>
      }


    </>
  )
};

export default Errors;
