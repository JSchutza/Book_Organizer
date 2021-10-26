
import { useSelector } from "react-redux";

import styles from "./errors.module.css";



const Errors = () => {
  const errors = useSelector(store => store.errorsReducer.errors);

  return errors && (
    <div className={styles.errors_wrap} >
      {errors.map(eachError => ( <p key={eachError} > {eachError} </p>))}
    </div>
  )
};

export default Errors;
