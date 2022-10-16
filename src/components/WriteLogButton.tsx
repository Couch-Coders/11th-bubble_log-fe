import React from 'react';
import { Link } from 'react-router-dom';

import Button from './common/Button';

const WriteLogButton: React.FC = () => {
  return (
    <Link to="/write">
      <Button>로그 작성</Button>
    </Link>
  );
};

export default WriteLogButton;
