import { store } from '@stores/index';
import { userActions } from '@stores/slices/user';
import { User } from 'firebase/auth';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import EditPage from '@pages/EditPage';
import HomePage from '@pages/HomePage';
import LogDetailPage from '@pages/LogDetailPage';
import LogsPage from '@pages/LogsPage';
import MyPage from '@pages/MyPage';
import WritePage from '@pages/WritePage';
import { FirebaseService } from '@services/firebase';
import GlobalStyle from '@styles/globalStyle';

const App: React.FC = () => {
  // load user here
  const token = false;
  if (token) store.dispatch(userActions.setIsLoggedIn(true));

  const { auth } = FirebaseService;

  const onAuthStateChanged = async (user: User | null): Promise<void> => {
    console.log('@user', user);
    if (user !== null) {
      store.dispatch(userActions.setIsLoggedIn(true));
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      void onAuthStateChanged(user);
    });
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
