import useAuth from '@hooks/useAuth';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import LogList from '@components/LogList';
import SearchFilter from '@components/SearchFilter';
import SearchInput from '@components/SearchInput';
import WriteLogButton from '@components/WriteLogButton';

const LogsPage: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) navigate('/');

  return (
    <main>
      <SearchInput />
      <SearchFilter type="diveType" />
      <SearchFilter type="depth" />
      <SearchFilter type="location" />
      <SearchFilter type="temperature" />
      <LogList />
      <WriteLogButton />
    </main>
  );
};

export default LogsPage;