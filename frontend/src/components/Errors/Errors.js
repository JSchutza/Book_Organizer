
import { useSelector } from "react-redux";





const Errors = () => {
  const errors = useSelector(store => store.errorsReducer.errors);



  return errors && (
    <>
    </>
  )
};

export default Errors;
