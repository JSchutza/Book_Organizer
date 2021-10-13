import { useEffect } from 'react';

import { useModalStyle } from "../../context/ReactModalStylesContext.js";

import ReactModal from 'react-modal';


import styles from "./imgpreview.module.css";





const ImgPreview = ({ urlpreview, cancelImgChoice, avatarUrl, openModal, setOpenModal  }) => {
  const { currentStyle, initImgPreviewStyle } = useModalStyle();


  useEffect(() => {
    initImgPreviewStyle();
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
