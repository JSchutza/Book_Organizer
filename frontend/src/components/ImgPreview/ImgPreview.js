import { useEffect } from 'react';

import { useModalStyle } from "../../context/ReactModalStylesContext.js";

import ReactModal from 'react-modal';


import styles from "./imgpreview.module.css";





const ImgPreview = ({ update=false, prevAvatar, urlpreview, cancelImgChoice, avatarUrl, openModal, setOpenModal  }) => {
  const { currentStyle, initImgPreviewStyle } = useModalStyle();


  useEffect(() => {
    initImgPreviewStyle();
  },[]);



  const closeModal = () => {
    setOpenModal(false);
  }



  if(update) {
    return (
      <>
          <div className={styles.url_preview_wrap}>
            <img src={prevAvatar} alt={"cool"} />
            <span>Last Avatar: </span>
          </div>

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
