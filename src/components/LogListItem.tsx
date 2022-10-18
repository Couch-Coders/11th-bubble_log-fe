import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LogResponse } from 'types/log';

import { logAPI } from '@apis/log';
import FavoriteToggleButton from '@components/FavoriteToggleButton';
import { blue } from '@styles/palette';

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
  const [isFavorite, setIsFavorite] = useState(data.isFavorite);

  const handleFavoriteToggleButtonClick = async () => {
    if (data?.id === undefined) return;
    setIsFavorite((prev) => !prev);
    try {
      await logAPI.toggleLogFavorite(String(data.id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link to={`/log/${String(data.id)}`}>
      <Container>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <FavoriteToggleButton
            checked={isFavorite}
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
