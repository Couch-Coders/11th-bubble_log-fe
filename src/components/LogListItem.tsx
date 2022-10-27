import { gray } from '@lib/styles/palette';
import { theme } from '@lib/styles/theme';
import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Flexbox from '@components/common/Flexbox';
import FavoriteToggleButton from '@components/FavoriteToggleButton';

import Card from './common/Card';

const Container = styled.li`
  margin-top: 1rem;
  border-radius: 0.25rem;
  border-left: 6px solid ${theme.primary};

  &:hover {
    box-shadow: ${theme.elevation2};
    transform: translateY(-2px);
    transition: 0.1s;
  }

  .log-id {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${gray[500]};
  }

  .log-date-location {
    color: ${gray[400]};
  }
`;

interface Props {
  logId: string;
  location: string;
  date: string;
  isFavorite: boolean;
}

const LogListItem: React.FC<Props> = ({
  logId,
  location,
  date,
  isFavorite,
}) => {
  return (
    <Link to={`/logs/${logId}`}>
      <Container>
        <Card>
          <Flexbox flex="col" gap="1rem" items="start" padding="1rem">
            <Flexbox gap="1rem">
              <p className="log-id">
                <span style={{ color: theme.primary }}>#</span> {logId}
              </p>
              <FavoriteToggleButton isFavorite={isFavorite} />
            </Flexbox>
            <p className="log-date-location">
              {format(new Date(date), 'yyyy년 MM월 dd일')}, {location}
            </p>
          </Flexbox>
        </Card>
      </Container>
    </Link>
  );
};

export default LogListItem;
