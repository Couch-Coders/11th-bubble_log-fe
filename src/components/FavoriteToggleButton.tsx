import React from 'react';

interface Props {
  checked: boolean;
  onClick: () => void;
}

const FavoriteToggleButton: React.FC<Props> = ({ checked, onClick }) => {
  return <input type="checkbox" checked={checked} onClick={onClick} readOnly />;
};

export default FavoriteToggleButton;
