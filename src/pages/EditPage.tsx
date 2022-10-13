import useAuth from '@hooks/useAuth';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EditPage: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) navigate('/');

  return <div>Edit</div>;
};

export default EditPage;
