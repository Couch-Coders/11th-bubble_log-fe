import React from 'react';
import styled from 'styled-components';

interface ContainerProps {
  width?: string;
}

const Container = styled.ul<ContainerProps>`
  position: absolute;
  top: calc(100% + 0.25rem);
  left: -1px;

  box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px -1px,
    rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px;

  border-radius: 0.25rem;
  width: ${({ width }) => width};
  width: calc(100% + 2px);

  overflow: hidden;

  z-index: 3;
`;

interface Props {
  children: React.ReactNode;
  width?: string;
}

const DropdownMenu: React.FC<Props> = ({ children, width }) => {
  return <Container width={width}>{children}</Container>;
};

export default DropdownMenu;
