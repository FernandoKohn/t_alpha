import { useState } from "react"
import { Outlet } from "react-router-dom"


export const Root = () => {

  const [isLogged, setIsLogged] = useState()

  return (
    <div>
      <div>
        <Outlet context={{ isLogged, setIsLogged }} />
      </div>
    </div>
  )
}

