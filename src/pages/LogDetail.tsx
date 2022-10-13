import useAuth from '@hooks/useAuth'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import ReturnToListButton from '@components/ReturnToListButton'

const LogDetail: React.FC = () => {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  if (!isLoggedIn) navigate('/')

  return <main>
    <ReturnToListButton />
  </main>
}

export default LogDetail
