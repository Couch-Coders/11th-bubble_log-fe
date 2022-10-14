import useAuth from '@hooks/useAuth';
import { useSelector } from '@stores/index';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { unregisterAPI } from '@apis/auth';

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) navigate('/');
  }, []);

  const { data } = useSelector((state) => state.user);

  const onClickUnregisterButton = async (): Promise<void> => {
    await unregisterAPI();
  };

  return (
    <main>
      <p>{data.name}</p>
      <p>{data.email}</p>
      <button
        onClick={() => {
          void onClickUnregisterButton;
        }}
      >
        탈퇴하기
      </button>
    </main>
  );
};

export default MyPage;
