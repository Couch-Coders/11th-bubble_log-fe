import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@components/common/Button';

const ReturnToListButton: React.FC = () => {
  return (
    <Link to="/logs">
      <Button variant="text">돌아가기</Button>
    </Link>
  );
};

export default ReturnToListButton;
