import React, { useState } from 'react'
import styles from "./Register.module.css"
import { Link, useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import axios from 'axios';

export const Register = () => {

    const [message, setMessage] = useState()
    const [userData, setUserData] = useState()

    const navigate = useNavigate()

    const server = axios.create({
        baseURL: 'https://luminy.glitch.me/user'
    })

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        const options = {
            method: 'POST',
            url: 'https://interview.t-alpha.com.br/api/auth/register',
            headers: { 'Content-Type': 'application/json' },
            data: {
                name: `${userData.name}`,
                taxNumber: `${userData.taxNumber}`,
                mail: `${userData.mail}`,
                phone: `${userData.phone}`,
                password: `${userData.password}`
            }
        }
        await server.post("", options).then(setMessage("Sucesso")).catch(err=> console.log(err))
        return setTimeout(() => {
            navigate("/Login")
        }, 3500)

    }


    return(
        <div className = { styles.main } >
            <h1 className={styles.title}><span className={styles.underline}>FAZER</span> CADASTRO</h1>
            <form className={styles.formContainer} onSubmit={handleSubmit} >
                <TextField onChange={handleChange} id="name" name="name" on label="Nome do usuário" variant="outlined" />
                <TextField onChange={handleChange} id="taxNumber" name="taxNumber" type='number' label="CPF ou CNPJ do usuário" variant="outlined" />
                <TextField onChange={handleChange} id="mail" name="mail" label="E-mail" variant="outlined" />
                <TextField onChange={handleChange} id="phone" name="phone" label="Telefone"  variant="outlined" type='Number' />
                <TextField onChange={handleChange} id="password" name="password" label="Senha" type='Password' variant="outlined" />
                <button type="submit"><i className='bx bx-log-in'></i>CADASTRAR</button>
            </form>
            <div className={styles.line}></div>
            <div className={styles.lowerDiv}>
                <h1>JÁ É CADASTRADO?</h1>
                <Link to={"/Login"}>
                    <div className={styles.loginButton}>Login</div>
                </Link>
            </div>
        </div >
    )
}
