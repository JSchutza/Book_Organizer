
import { useSelector } from "react-redux";





const Errors = () => {
  const errors = useSelector(store => store.errorsReducer.errors);

  return errors && (
    <>
      <ul>
        {errors.map(eachError => (
          <li> {eachError} </li>
        ))}
      </ul>
    </>
  )
};

export default Errors;
