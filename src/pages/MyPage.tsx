import { authAPI } from '@lib/apis/auth';
import { useSelector } from '@store/index';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Flexbox from '@components/common/Flexbox';
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
      <Flexbox flex="col" items="start" padding="1rem" gap="1rem">
        <p>{data.name}</p>
        <p>{data.email}</p>
        <Flexbox width="100%" justify="end">
          <UnregisterButton
            onClick={() => {
              void handleUnregisterButtonClick;
            }}
          />
        </Flexbox>
      </Flexbox>
    </Layout>
  );
};

export default MyPage;
