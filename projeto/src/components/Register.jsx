import React, { useState } from 'react'
import styles from "./Register.module.css"
import { Link, useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Messages } from './utils/Messages';


export const Register = () => {

    const [messageType, setMessageType] = useState('')
    const [messageContent, setMessageContent] = useState('')
    const [errorArray, setErrorArray] = useState([])
    const [userData, setUserData] = useState()
    const [open, setOpen] = useState(false)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const options = {
            method: 'POST',
            url: 'https://interview.t-alpha.com.br/api/auth/register',
            headers: { 'Content-Type': 'application/json' },
            data: {
                name: `${toString(userData.name)}`,
                taxNumber: `${userData.taxNumber}`,
                mail: `${userData.email}`,
                phone: userData.phone,
                password: userData.password
            }
        }

        try {
            const { data } = await axios.request(options);
            setMessageContent("Cadastrado com Sucesso")
            setMessageType("success")
            setTimeout(()=> {
                navigate("/Login")
            },1000)
        } catch (error) {
            setErrorArray(error.response.data.message)
            setMessageType("error")
        }
    }


        return (
            <div className={styles.main} >
                    {(messageType && open) && (
                        <Messages setErrorArray={setErrorArray} messageType={messageType} setOpen={setOpen} messageContent={messageContent} errorArray={errorArray}/>
                    )}
                <h1 className={styles.title}><span className={styles.underline}>FAZER</span> CADASTRO</h1>
                <form className={styles.formContainer} onSubmit={handleSubmit} >
                    <TextField onChange={handleChange} type='text' inputProps={{ maxLength: 25 }} required id="name" name="name" label="Nome do usuário" variant="outlined" />
                    <TextField onChange={handleChange}  type='number' inputProps={{ maxLength: 25 }} required id="taxNumber" name="taxNumber" label="CPF ou CNPJ do usuário" variant="outlined" />
                    <TextField onChange={handleChange} type='text' inputProps={{ maxLength: 35 }} required id="email" name="email" label="E-mail" variant="outlined" />
                    <TextField onChange={handleChange} inputProps={{ maxLength: 25 }} required id="phone" name="phone" label="Telefone" variant="outlined" type='Number' />
                    <TextField onChange={handleChange} inputProps={{ maxLength: 25 }} required id="password" name="password" label="Senha" type='Password' variant="outlined" />
                    <button type="submit" onClick={()=> setOpen(true)}><i className='bx bx-log-in'></i>CADASTRAR</button>
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
