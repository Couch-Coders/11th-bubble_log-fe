import useAuth from '@hooks/useAuth';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@components/common/Button';

const HomePage: React.FC = () => {
  const { isLoggedIn, login } = useAuth();

  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    void login();
  };

  useEffect(() => {
    if (isLoggedIn) navigate('/logs');
  }, [isLoggedIn, navigate]);

  return (
    <main>
      <Button onClick={handleLoginButtonClick}>로그인</Button>
    </main>
  );
};

export default HomePage;
