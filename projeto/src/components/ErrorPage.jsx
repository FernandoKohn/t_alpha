import { useRouteError } from "react-router-dom";
import styles from "./ErrorPage.module.css"
import { Link } from "react-router-dom";

export function ErrorPage() {

    //Página para possíveis erros

    const error = useRouteError()
    console.error(error)

    return (
        <div id={styles.errorPage}>
            <h1>Oops!</h1>
            <p>Desculpe, algo inesperado aconteceu.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <Link to="/">Voltar</Link>
        </div>
    )
}