import { yellow } from '@lib/styles/palette';
import React from 'react';
import { MdStar, MdStarOutline } from 'react-icons/md';
import styled from 'styled-components';

const Container = styled.div`
  color: ${yellow[300]};
  width: 2rem;
  height: 2rem;
  cursor: pointer;

  .star-contained {
    width: 2rem;
    height: 2rem;
  }

  .star-outlined {
    width: 2rem;
    height: 2rem;
  }
`;

interface Props {
  isFavorite: boolean;
  onClick: () => void;
}

const FavoriteToggleButton: React.FC<Props> = ({ isFavorite, onClick }) => {
  return (
    <Container>
      {isFavorite && <MdStar className="star-contained" onClick={onClick} />}
      {!isFavorite && (
        <MdStarOutline className="star-outlined" onClick={onClick} />
      )}
    </Container>
  );
};

export default FavoriteToggleButton;
