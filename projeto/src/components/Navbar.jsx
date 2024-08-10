import styles from "./Navbar.module.css"
import bellIcon from '../img/bell.png'
import { useNavigate, useOutletContext } from "react-router-dom"
import Tooltip from '@mui/material/Tooltip';

export const Navbar = () => {

    const context = useOutletContext
    const navigate = useNavigate()

    const logOut = e => {
        context.setIsLogged(false)
        navigate("/", {replace:true})
    }

  return (
    <div className={styles.main}>
        <div className={styles.logo}>
            <i id={styles.arrow} className='bx bx-up-arrow-alt'></i>
            <h1>UP</h1>
        </div>
        <div className={styles.userInfo}>
            <div className={styles.bellDiv}>
               <img src={bellIcon} alt="Sino" />
               <div className={styles.redBall}></div>
            </div>
            <div className={styles.userPicDiv}>
                <img className={styles.userPic} src="https://avatar.iran.liara.run/public" alt="Profile Picture" />
                <i id={styles.logOutButton} className='bx bx-log-in-circle' onClick={logOut}></i>
            </div>
        </div>
    </div>
  )
}
