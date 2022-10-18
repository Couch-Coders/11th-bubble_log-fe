import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LogResponse } from 'types/log';

import { toggleLogFavoriteAPI } from '@apis/log';
import { blue } from '@styles/palette';

import FavoriteToggleButton from './FavoriteToggleButton';

const Container = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  &:hover {
    background-color: ${blue[50]};
  }
`;

interface Props {
  data: LogResponse;
}

const LogListItem: React.FC<Props> = ({ data }) => {
  const handleFavoriteToggleButtonClick = async (): Promise<void> => {
    if (data?.id === undefined) return;
    try {
      await toggleLogFavoriteAPI(data.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link to={`/log/${String(data.id)}`}>
      <Container>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <FavoriteToggleButton
            checked={data.isFavorite}
            onClick={() => {
              void handleFavoriteToggleButtonClick;
            }}
          />
          <p>#{data.id}</p>
          <p>{data.location}</p>
        </div>
        <p>{data.date}</p>
      </Container>
    </Link>
  );
};

export default LogListItem;
