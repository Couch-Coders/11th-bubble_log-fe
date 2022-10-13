import useAuth from '@hooks/useAuth'
import React from 'react'

const Home: React.FC = () => {
  const { isLoggedIn, login, logOut } = useAuth()

  const onClickLoginButton = (): void => {
    void login()
  }

  const onClickLogOutButton = (): void => {
    void logOut()
  }

  return <main>
    {isLoggedIn
      ? <button type='button' onClick={onClickLogOutButton}>로그아웃</button>
      : <button type='button' onClick={onClickLoginButton}>로그인</button>

}
  </main>
}

export default Home
