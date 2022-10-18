import React, { useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import styled, { css } from 'styled-components';

import { gray } from '@styles/palette';

type DropdownButtonSizeType = 'small' | 'medium' | 'large';

const dropdownButtonStyle = {
  small: css`
    height: 2rem;
    padding: 0.75rem;
    font-size: 0.75rem;
    min-width: 4rem;
  `,
  medium: css`
    height: 2.5rem;
    padding: 0.75rem;
    font-size: 0.875rem;
    min-width: 5rem;
  `,
  large: css`
    height: 3rem;
    padding: 0.75rem;
    font-size: 1rem;
    min-width: 6rem;
  `,
};

interface ContainerProps {
  size?: DropdownButtonSizeType;
  open: boolean;
}

const Container = styled.button<ContainerProps>`
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;

  font-weight: 500;
  border-radius: 0.5rem;
  border: 1px solid ${gray[300]};
  background-color: white;

  cursor: pointer;

  &:hover {
    background-color: ${gray[100]};
  }

  ${({ size }) => size !== undefined && dropdownButtonStyle[size]};

  ${({ open }) =>
    open &&
    css`
      .arrow-dropdown-icon {
        transform: rotate(180deg);
      }
    `}
`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  size?: DropdownButtonSizeType;
}

const DropdownButton: React.FC<Props> = ({
  children,
  label = '메뉴',
  size = 'medium',
  ...props
}) => {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Container size={size} open={open} onClick={onClick} {...props}>
      {label}
      <MdArrowDropDown
        className="arrow-dropdown-icon"
        size="1.25rem"
        color={gray[500]}
      />
      {open && children}
    </Container>
  );
};

export default DropdownButton;
