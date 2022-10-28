import { gray } from '@lib/styles/palette';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Value = styled.p`
  font-size: 1.25rem;
  color: ${gray[700]};
`;

const Label = styled.p`
  color: ${gray[400]};
`;

interface Props {
  label: string;
  value: string;
}

const LogDetailMetricsItem: React.FC<Props> = ({ label, value }) => {
  return (
    <Container>
      <Value>{value}</Value>
      <Label>{label}</Label>
    </Container>
  );
};

export default LogDetailMetricsItem;
