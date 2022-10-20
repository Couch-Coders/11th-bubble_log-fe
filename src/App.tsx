import GlobalStyle from '@lib/styles/globalStyle';
import { useDispatch } from '@store/index';
import { fetchUser } from '@store/slices/user';
import { User } from 'firebase/auth';
import React, { useCallback, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from '@components/Header';
import EditPage from '@pages/EditPage';
import HomePage from '@pages/HomePage';
import LogDetailPage from '@pages/LogDetailPage';
import LogsPage from '@pages/LogsPage';
import MyPage from '@pages/MyPage';
import WritePage from '@pages/WritePage';
import { FirebaseService } from '@services/firebase';

const App: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const { auth } = FirebaseService;

  const dispatch = useDispatch();

  const onAuthStateChanged = useCallback(
    async (user: User | null): Promise<void> => {
      if (user === null) return;
      const token = await user.getIdToken();
      console.log('@token', token);
      await dispatch(fetchUser(token));
    },
    [dispatch],
  );

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      void onAuthStateChanged(user);
    });
  }, [auth, onAuthStateChanged]);

  return (
    <>
      <GlobalStyle />
      {!isHome && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logs" element={<LogsPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/logs/:logId" element={<LogDetailPage />} />
        <Route path="/logs/:logId/edit" element={<EditPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </>
  );
};

export default App;
