import { gray, yellow } from '@lib/styles/palette';
import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import styled from 'styled-components';

const STAR_SIZE = '1.75rem';

const Container = styled.div`
  width: ${STAR_SIZE};
  height: ${STAR_SIZE};
  cursor: pointer;

  .star-contained {
    color: ${yellow[300]};
    width: ${STAR_SIZE};
    height: ${STAR_SIZE};
  }

  .star-outlined {
    color: ${gray[300]};
    width: ${STAR_SIZE};
    height: ${STAR_SIZE};
  }
`;

interface Props {
  isFavorite: boolean;
  onClick?: () => void;
}

const FavoriteToggleButton: React.FC<Props> = ({ isFavorite, onClick }) => {
  return (
    <Container>
      {isFavorite && (
        <AiFillStar className="star-contained" onClick={onClick} />
      )}
      {!isFavorite && (
        <AiOutlineStar className="star-outlined" onClick={onClick} />
      )}
    </Container>
  );
};

export default FavoriteToggleButton;
