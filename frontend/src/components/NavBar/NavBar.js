import { NavLink, useHistory } from "react-router-dom";

import { useDispatch } from "react-redux"

import { FiLogIn } from 'react-icons/fi'
import { ImUserPlus } from "react-icons/im";
import { GiBookshelf, GiCardDraw } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { BsQuestionSquareFill } from "react-icons/bs";

import { useUser } from "../../context/UserContext";

import LogoutButton from "../LogoutButton"
import ToolTip from "../ToolTip";

import styles from "./navbar.module.css";


const NavBar = () => {
  const { isUser } = useUser();
  const history = useHistory();
  const dispatch = useDispatch();






  // if the user IS logged in

  if (isUser) {
  return (
    <>
    <div>
      <nav className={styles.nav}>
          <ToolTip content={'Characters'} >
          <li> <NavLink to="/characters"  onClick={event => event.preventDefault()} > <GiCardDraw/> </NavLink></li>
          </ToolTip>


          <ToolTip content={'Profile'} >
            <li> <NavLink to="/profile"  onClick={event => event.preventDefault()}> <CgProfile/> </NavLink></li>
          </ToolTip>


          <ToolTip content={'Books'} >
            <li> <NavLink to="/books"  onClick={event => event.preventDefault()}> <GiBookshelf/> </NavLink></li>
          </ToolTip>


          <ToolTip content={'Polls'}>
            <li> <NavLink to='/polls' > <BsQuestionSquareFill/> </NavLink> </li>
          </ToolTip>


          <ToolTip content={'Logout'} >
          <li> <LogoutButton /> </li>
          </ToolTip>
      </nav>
    </div>


    </>
  );

  }

// if the user is NOT logged in
  return (
    <>
      <div>
        <nav className={styles.nav}>

          <ToolTip content={'Login'} >
            <li> <NavLink to='/login'  > <FiLogIn /> </NavLink> </li>
          </ToolTip>



          <ToolTip content={'Signup'} >
            <li> <NavLink to='/signup'> <ImUserPlus /> </NavLink> </li>
          </ToolTip>

        </nav>
      </div>


    </>
  );


};





export default NavBar;
