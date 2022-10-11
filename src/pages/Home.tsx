import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home: React.FC = (props) => {
  const auth = getAuth()
  const navigate = useNavigate()
  const [authing, setAuthing] = useState(false)
  const signInWithGoogle = async (): Promise<void> => {
    setAuthing(true)

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response)
        navigate('/logs')
      })
      .catch((error) => {
        console.log(error)
        setAuthing(false)
      })
  }
  return (
    <div>
      Home
      <button
        onClick={() => {
          void signInWithGoogle()
        }}
        disabled={authing}
      >
        Sign in google
      </button>
    </div>
  )
}

export default Home
