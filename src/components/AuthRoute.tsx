import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  children?: React.ReactNode
}
const AuthRoute: React.FunctionComponent<Props> = ({ children }) => {
  const auth = getAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user != null) {
        setLoading(false)
      } else {
        console.log('unauthorized')
        navigate('/')
      }
    })

    return () => unsubscribe()
  }, [auth])

  if (loading) return <div>logding</div>
  return <div>{children}</div>
}
export default AuthRoute
