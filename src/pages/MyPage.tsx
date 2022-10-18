import { useSelector } from '@stores/index';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { authAPI } from '@apis/auth';
import Layout from '@components/Layout';
import UnregisterButton from '@components/UnregisterButton';

const MyPage: React.FC = () => {
  const { data } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleUnregisterButtonClick = async () => {
    try {
      await authAPI.unregister();
      navigate('/', {
        replace: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <p>{data.name}</p>
      <p>{data.email}</p>
      <UnregisterButton
        onClick={() => {
          void handleUnregisterButtonClick;
        }}
      />
    </Layout>
  );
};

export default MyPage;
