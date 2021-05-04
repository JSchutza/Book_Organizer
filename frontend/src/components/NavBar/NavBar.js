import React from 'react';
import styles from "./navbar.module.css";



const NavBar = ({ userStatus }) => {

  if (userStatus === false){
    return (
      <div>
        <nav className={styles.nav}>
          <li> nav for logged out user </li>
        </nav>
      </div>
    );
  }

  return (
    <div>
      <nav className={styles.nav}>
        <li> nav for active user </li>
      </nav>
    </div>
  );
};





export default NavBar;
