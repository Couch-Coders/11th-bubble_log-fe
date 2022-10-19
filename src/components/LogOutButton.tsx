import useAuth from '@hooks/useAuth';
import React from 'react';

const LogOutButton: React.FC = () => {
  const { logOut } = useAuth();

  const handleLogOutButtonClick = () => {
    void logOut();
  };

  return <button onClick={handleLogOutButtonClick}>로그아웃</button>;
};

export default LogOutButton;
