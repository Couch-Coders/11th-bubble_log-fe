import { useSelector } from '@stores/index';
import React from 'react';

import { unregisterAPI } from '@apis/auth';

const MyPage: React.FC = () => {
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
