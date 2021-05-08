import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideModal } from '../../store/actions/modal.js';




const Modal = ({ children }) =>  {
  const dispatch = useDispatch();
  const display = useSelector(state => state.modalReducer.display);

  const onClose = () => {
    dispatch(hideModal());
  };


  return display && (
    <div onClick={onClose} className='modal_background'>
        { children }
    </div>
  );

};









export default Modal;
