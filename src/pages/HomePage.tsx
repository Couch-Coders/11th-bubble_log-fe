import useAuth from '@hooks/useAuth';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { isLoggedIn, login, logOut } = useAuth();

  const navigate = useNavigate();

  const onClickLoginButton = (): void => {
    void login();
  };

  const onClickLogOutButton = (): void => {
    void logOut();
  };

  useEffect(() => {
    if (isLoggedIn) navigate('/logs');
  }, []);

  return (
    <main>
      {isLoggedIn ? (
        <button type="button" onClick={onClickLogOutButton}>
          로그아웃
        </button>
      ) : (
        <button type="button" onClick={onClickLoginButton}>
          로그인
        </button>
      )}
    </main>
  );
};

export default HomePage;
