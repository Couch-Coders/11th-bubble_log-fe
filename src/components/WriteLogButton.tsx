import React from 'react';
import { Link } from 'react-router-dom';

const WriteLogButton: React.FC = () => {
  return <Link to="/write">로그 작성</Link>;
};

export default WriteLogButton;
