import React from 'react'
import { Navigate, Outlet, useOutletContext } from 'react-router-dom'

export const ProtectedDashboard = () => {

    //Componente para protejer o acesso ao dashboard caso usuário não esteja logado

    const context = useOutletContext()

    if (!context.token) {
        return <Navigate to="/Registrar" replace={true}/>
    }

    return (
        <>
            <Outlet context={context} />
        </>
    )
}
