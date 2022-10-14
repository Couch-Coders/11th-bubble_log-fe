import React from 'react';
import { Link, useParams } from 'react-router-dom';

import Button from './common/Button';

const UpdateLogButton: React.FC = () => {
  const params = useParams();
  const logId = Number(params.id);

  return (
    <Link to={`/log/${logId}/edit`}>
      <Button>수정하기</Button>;
    </Link>
  );
};

export default UpdateLogButton;
