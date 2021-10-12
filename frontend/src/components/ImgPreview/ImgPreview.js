import { useEffect } from 'react';

import { useModalStyle } from "../../context/ReactModalStylesContext.js";

import ReactModal from 'react-modal';


import styles from "./imgpreview.module.css";

// need to have a way to identify this a a modal that needs a different style object



const ImgPreview = ({ urlpreview, cancelImgChoice, avatarUrl, openModal, setOpenModal  }) => {
  const { currentStyle, updateStyle } = useModalStyle();

  // updateStyle('content', 'width', '10vw');
  // TESTING
  // set the style for this modal on first render
  useEffect(() => {
    updateStyle('content', 'width', '10vw');
  },[]);



  const closeModal = () => {
    setOpenModal(false);
  }




  return (
    <>
     <ReactModal
        isOpen={openModal}
        onRequestClose={closeModal}
        style={currentStyle}
        appElement={document.getElementById('root')}
      >

      <div className={styles.url_preview_wrap}>
        {urlpreview === null ?
          null
          :
          <>
            <img src={avatarUrl} alt={"cool"} />
            <button onClick={cancelImgChoice}> Cancel </button>
          </>
        }
      </div>

    </ReactModal>


    </>
  )
};

export default ImgPreview;
