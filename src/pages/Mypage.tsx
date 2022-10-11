import { getAuth, signOut } from 'firebase/auth'
import React from 'react'

const Mypage: React.FC = (props) => {
  const auth = getAuth()
  return (
    <div>
      Mypage
      <button
        onClick={() => {
          void signOut(auth)
        }}
      >
        signout
      </button>
    </div>
  )
}

export default Mypage
