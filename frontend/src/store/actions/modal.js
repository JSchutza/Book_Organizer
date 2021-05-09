


import { SHOW_MODAL, HIDE_MODAL, CONTENT_MODAL } from "../types";




const showModal = () => ({
  type: SHOW_MODAL
});



const hideModal = () => ({
  type: HIDE_MODAL
});






const contentModal = (the_content) => ({
  type: CONTENT_MODAL,
  the_content
});




export {
  showModal,
  hideModal,
  contentModal,


}
