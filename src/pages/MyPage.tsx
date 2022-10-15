import { useSelector } from '@stores/index';
import React from 'react';

import Layout from '@components/Layout';
import UnregisterButton from '@components/UnregisterButton';

const MyPage: React.FC = () => {
  const { data } = useSelector((state) => state.user);

  return (
    <Layout>
      <p>{data.name}</p>
      <p>{data.email}</p>
      <UnregisterButton />
    </Layout>
  );
};

export default MyPage;
