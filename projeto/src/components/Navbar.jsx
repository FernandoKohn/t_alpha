import styles from "./Navbar.module.css"
import bellIcon from '../img/bell.png'
import { Link, useNavigate, useOutletContext } from "react-router-dom"
import Tooltip from '@mui/material/Tooltip';

export const Navbar = () => {

    const context = useOutletContext()
    const navigate = useNavigate()

    const logOut = e => {
        context.setToken(null)
        navigate("/", { replace: true })
    }

    return (
        <div className={styles.main}>
            <div className={styles.logo}>
                <i id={styles.arrow} className='bx bx-up-arrow-alt'></i>
                <Link to={"/"}>
                    <h1>UP</h1>
                </Link>
            </div>
            <div className={styles.userInfo}>
                <div className={styles.bellDiv}>
                    <Tooltip title="Notificações" placement="bottom">
                        <img src={bellIcon} alt="Sino" />
                    </Tooltip>
                    <div className={styles.redBall}></div>
                </div>
                <div className={styles.userPicDiv}>
                    <Tooltip title="Usuário" placement="bottom">
                        <img className={styles.userPic} src="https://avatar.iran.liara.run/public" alt="Profile Picture" />
                    </Tooltip>
                    <Tooltip title="Sair" placement="bottom">
                        <i id={styles.logOutButton} className='bx bx-log-in-circle' onClick={logOut}></i>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}
