import styles from './Login.module.css'
import { Messages } from './utils/Messages';
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useState } from 'react';


export const Login = () => {

    const [messageType, setMessageType] = useState()
    const [messageContent, setMessageContent] = useState()
    const [loginData, setLoginData] = useState()
    const [errorArray, setErrorArray] = useState()
    const [open, setOpen] = useState(false)

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
            data: { taxNumber: loginData.taxNumber, password: loginData.password }
        }

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
                {(messageType && open) && (
                    <Messages setErrorArray={setErrorArray} messageType={messageType} messageContent={messageContent} setOpen={setOpen} errorArray={errorArray} />
                )}
            <h1 className={styles.title}><span className={styles.underline}>FAZER</span> LOGIN</h1>
            <form className={styles.formContainer} onSubmit={handleSubmit} >
                <TextField onChange={handleChange} type='number' inputProps={{ maxLength: 25 }} required id="taxNumber" name="taxNumber" label="CPF ou CNPJ do usuário" variant="outlined" />
                <TextField onChange={handleChange} type='Password' inputProps={{ maxLength: 25 }} id="password" name="password" label="Senha" required variant="outlined" />
                <button type="submit" onClick={()=> setOpen(true)}><i className='bx bx-log-in' ></i>ENTRAR</button>
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
