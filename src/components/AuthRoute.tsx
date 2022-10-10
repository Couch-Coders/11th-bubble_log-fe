import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
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
      if (user) {
        setLoading(false)
      } else {
        console.log('unauthorized')
        navigate('/login')
      }
    })

    return () => unsubscribe()
  }, [auth])

  if (loading) return <div>logding</div>
  return <div>{children}</div>
}
export default AuthRoute