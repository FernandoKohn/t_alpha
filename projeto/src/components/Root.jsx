import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"


export const Root = () => {

  //Componente Root que passa props para todos os seus childrens sem precisar de props drill.

  const [token, setToken] = useState(null)
  

  return (
    <div>
      <div>
        <Outlet context={{ token, setToken }} />
      </div>
    </div>
  )
}

