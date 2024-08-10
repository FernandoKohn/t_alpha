import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"


export const Root = () => {

  const [token, setToken] = useState(null)

  return (
    <div>
      <div>
        <Outlet context={{ token, setToken }} />
      </div>
    </div>
  )
}

