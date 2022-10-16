import { useSelector } from '@stores/index';
import React from 'react';

import { unregisterAPI } from '@apis/auth';
import Layout from '@components/Layout';

const MyPage: React.FC = () => {
  const { data } = useSelector((state) => state.user);

  const onClickUnregisterButton = async (): Promise<void> => {
    await unregisterAPI();
  };

  return (
    <Layout>
      <p>{data.name}</p>
      <p>{data.email}</p>
      <button
        onClick={() => {
          void onClickUnregisterButton;
        }}
      >
        탈퇴하기
      </button>
    </Layout>
  );
};

export default MyPage;
