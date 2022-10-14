import useAuth from '@hooks/useAuth';
import React from 'react';

interface ReturnType {
  onClick: () => void;
}

const useLogOutButton = (): ReturnType => {
  const { logOut } = useAuth();

  const onClick = (): void => {
    void logOut();
  };

  return { onClick };
};

const LogOutButton: React.FC = () => {
  const { onClick } = useLogOutButton();

  return <button onClick={onClick}>로그아웃</button>;
};

export default LogOutButton;
