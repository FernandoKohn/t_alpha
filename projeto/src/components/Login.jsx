import React from 'react'
import styles from './Login.module.css'
export const Login = () => {
    return (
        <div className={styles.main}>
            <h1>Fazer Login</h1>
            <form className={styles.form}>
                <label htmlFor="user" >USUÁRIO</label>
                <input type="text" id="user" name="user" maxLength={25} required />
                <label htmlFor="user">SENHA</label>
                <input type="password" id="password" name="password" minLength={6} maxLength={12} required />
            </form>
        </div>
    )
}
