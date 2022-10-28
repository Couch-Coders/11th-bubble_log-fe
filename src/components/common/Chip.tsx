import { gray } from '@lib/styles/palette';
import React from 'react';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  height: 2rem;
  background-color: ${gray[200]};
  color: ${gray[600]};
  font-size: 0.75rem;
  border-radius: 1rem;
  padding: 0.5rem;
  padding-left: 0.75rem;

  .close-button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${gray[400]};
    color: white;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    padding: 0.1rem;

    cursor: pointer;
    transition: 0.1s;

    &:hover {
      background-color: ${gray[500]};
    }
  }
`;

interface Props {
  label: string;
  onDelete?: () => void;
}

const Chip: React.FC<Props> = ({ label, onDelete }) => {
  return (
    <Container>
      {label}
      <div className="close-button">
        <MdClose size="1rem" cursor="pointer" onClick={onDelete} />
      </div>
    </Container>
  );
};

export default Chip;
