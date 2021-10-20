
import splashImg from "./splash_img.gif";

import Footer from "../Footer";


import styles from "./homeloader.module.css";



const HomeLoader = () => {

  return (
    <>
      <div className={styles.main_box}>
        <div className={styles.card_view}>
          <img src={splashImg} />
        </div>
      </div>

      <Footer />
    </>
  );

};




export default HomeLoader;
