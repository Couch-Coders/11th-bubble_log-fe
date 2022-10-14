import useAuth from '@hooks/useAuth';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import EditPage from '@pages/EditPage';
import HomePage from '@pages/HomePage';
import LogDetailPage from '@pages/LogDetailPage';
import LogsPage from '@pages/LogsPage';
import MyPage from '@pages/MyPage';
import WritePage from '@pages/WritePage';
import GlobalStyle from '@styles/globalStyle';

const App: React.FC = () => {
  const { login } = useAuth();

  // load user here
  const loadUser = async (): Promise<void> => {
    const token = false;
    if (token) await login();
  };

  useEffect(() => {
    void loadUser();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logs" element={<LogsPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/log/:id" element={<LogDetailPage />} />
        <Route path="/log/:id/edit" element={<EditPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </>
  );
};

export default App;
