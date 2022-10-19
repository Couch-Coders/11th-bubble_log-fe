import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { logAPI } from '@apis/log';
import FavoriteToggleButton from '@components/FavoriteToggleButton';
import { blue } from '@styles/palette';

import Flexbox from './common/Flexbox';

const Container = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  &:hover {
    background-color: ${blue[50]};
  }
`;

interface Props {
  isFavorite: boolean;
  logId: string;
  location: string;
  date: string;
}

const LogListItem: React.FC<Props> = ({
  isFavorite,
  logId,
  location,
  date,
}) => {
  const [isToggleButtonChecked, setIsToggleButtonChecked] =
    useState(isFavorite);

  const handleFavoriteToggleButtonClick = async () => {
    setIsToggleButtonChecked((prev) => !prev);
    try {
      await logAPI.toggleLogFavorite(logId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link to={`/log/${logId}`}>
      <Container>
        <Flexbox gap="1rem">
          <FavoriteToggleButton
            checked={isToggleButtonChecked}
            onClick={() => {
              void handleFavoriteToggleButtonClick;
            }}
          />
          <p>#{logId}</p>
          <p>{location}</p>
        </Flexbox>

        <p>{date}</p>
      </Container>
    </Link>
  );
};

export default LogListItem;
