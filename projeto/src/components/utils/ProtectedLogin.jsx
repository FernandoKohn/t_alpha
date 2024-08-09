import React from 'react'
import { Navigate, Outlet, useOutletContext } from 'react-router-dom'

export const ProtectedLogin = () => {

    const context = useOutletContext()

    if (context.isLogged === true) {
        return <Navigate to="/Dashboard" replace={true}/>
    }

    return (
        <>
            <Outlet context={context} />
        </>
    )
}
