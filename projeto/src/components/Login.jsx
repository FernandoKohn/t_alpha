import styles from './Login.module.css'
import { Messages } from './utils/Messages';
import { Link, replace, useNavigate, useOutletContext } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useState } from 'react';


export const Login = () => {

    const [messageType, setMessageType] = useState()
    const [messageContent, setMessageContent] = useState()
    const [loginData, setLoginData] = useState()
    const [errorArray, setErrorArray] = useState()

    const userContext = useOutletContext()
    const navigate = useNavigate()

    const handleChange = e => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const options = {
            method: 'POST',
            url: 'https://interview.t-alpha.com.br/api/auth/login',
            headers: { 'Content-Type': 'application/json' },
            data: { taxNumber: `${loginData.taxNumber}`, password: `${parseInt(loginData.password)}` }
        };

        try {
            const { data } = await axios.request(options);
            setMessageContent("Logado com sucesso")
            setMessageType("success")
            userContext.setToken(data.data.token)
            setTimeout(() => {
                navigate("/Dashboard", {replace: true})
            }, 1000)
        } catch (error) {
            setErrorArray([error.response.data.message])
            setMessageType("error")
        }
    }


    return (
        <div className={styles.main} >
                {messageType && (
                    <Messages messageType={messageType} messageContent={messageContent} errorArray={errorArray} />
                )}
            <h1 className={styles.title}><span className={styles.underline}>FAZER</span> LOGIN</h1>
            <form className={styles.formContainer} onSubmit={handleSubmit} >
                <TextField onChange={handleChange} id="taxNumber" name="taxNumber" type='number' label="CPF ou CNPJ do usuário" variant="outlined" />
                <TextField onChange={handleChange} id="password" name="password" label="Senha" type='Password' variant="outlined" />
                <button type="submit"><i className='bx bx-log-in'></i>ENTRAR</button>
            </form>
            <div className={styles.line}></div>
            <div className={styles.lowerDiv}>
                <h1>NÃO É REGISTRADO?</h1>
                <Link to={"/Registrar"}>
                    <div className={styles.loginButton}>Registrar</div>
                </Link>
            </div>
        </div >
    )
}
