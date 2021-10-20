
import { VscGithub } from "react-icons/vsc";
import { FaLinkedin } from "react-icons/fa";

import styles from './footer.module.css';


const Footer = () => {

  return (
    <div>
      <a href='https://github.com/JSchutza' target="_blank"> <VscGithub /> </a>
      <a href='https://www.linkedin.com/in/joshua-schutza-559819ba/' target="_blank"> <FaLinkedin /> </a>
    </div>
  )
};


export default Footer;
