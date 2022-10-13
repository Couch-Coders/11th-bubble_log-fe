import React from 'react';
import { Link } from 'react-router-dom';

const ReturnToListButton: React.FC = () => {
  return (
    <Link to="/logs">
      <button>돌아가기</button>
    </Link>
  );
};

export default ReturnToListButton;
