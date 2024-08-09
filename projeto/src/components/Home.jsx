import { Link } from "react-router-dom"
import styles from "./Home.module.css"


export function Home() {

  return (
    <div className={styles.main}>
      <h1>Dê um <i id={styles.arrow} className='bx bx-up-arrow-alt' ></i><span id={styles.arrow}>UP</span></h1>
      <h1>Na sua gestão</h1>
      <div className={styles.lowerTitle}>
        <p>Nosso renomado gerenciador de preços e estoque está aqui para ajudar.</p>
        <div className={styles.buttons}>
          <Link to="/Login">
            <div className={styles.first}>Login</div>
          </Link>
          <Link to="/Registrar">
            <div className={styles.second}>Registrar</div>
          </Link>
        </div>
      </div>
    </div>
  )
}


