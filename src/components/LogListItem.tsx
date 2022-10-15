import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LogResponse } from 'types/log';

import { blue } from '@styles/palette';

import ToggleFavoriteButton from './ToggleFavoriteButton';

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
  return (
    <Link to={`logs/${String(data.id)}`}>
      <Container>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <ToggleFavoriteButton isFavorite={data.isFavorite} logId={data.id} />
          <p>#{data.id}</p>
          <p>{data.location}</p>
        </div>
        <p>{data.date}</p>
      </Container>
    </Link>
  );
};

export default LogListItem;
