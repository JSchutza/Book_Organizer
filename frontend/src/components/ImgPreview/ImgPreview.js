


import styles from "./imgpreview.module.css";





const ImgPreview = ({ urlpreview, cancelImgChoice, avatarUrl  }) => {


  return (
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
  )
};

export default ImgPreview;
