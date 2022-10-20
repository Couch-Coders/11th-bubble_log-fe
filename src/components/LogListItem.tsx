import { blue } from '@lib/styles/palette';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Flexbox from '@components/common/Flexbox';

const Container = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  &:hover {
    background-color: ${blue[50]};
  }
`;

interface Props {
  logId: string;
  location: string;
  date: string;
}

const LogListItem: React.FC<Props> = ({ logId, location, date }) => {
  return (
    <Link to={`/logs/${logId}`}>
      <Container>
        <Flexbox gap="1rem">
          <p>#{logId}</p>
          <p>{location}</p>
        </Flexbox>
        <p>{date}</p>
      </Container>
    </Link>
  );
};

export default LogListItem;
