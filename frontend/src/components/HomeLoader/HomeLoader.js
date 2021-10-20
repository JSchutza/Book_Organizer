import { useState } from "react";
import splashImg from "./splash_img.gif";
import pausedImg from "../../icons/small/medallion_front.JPG";

import Footer from "../Footer";


import styles from "./homeloader.module.css";



const HomeLoader = () => {
  const [ pause, setPause ] = useState(false);



  return (
    <>
    {!pause ?
      <div className={styles.main_box}>
        <div className={styles.card_view}>
          <img src={splashImg} onClick={()=> setPause(true)} />
        </div>
      </div>
      :
      <div className={styles.main_box}>
        <div className={styles.card_view}>
          <img src={pausedImg} onClick={() => setPause(false)} />
        </div>
      </div>
    }

      <Footer />
    </>
  );

};




export default HomeLoader;
