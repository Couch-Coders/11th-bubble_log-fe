import useOutsideClick from '@hooks/useOutsideClick';
import { gray } from '@lib/styles/palette';
import React, { useRef, useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import styled, { css } from 'styled-components';

type DropdownButtonSize = 'small' | 'medium' | 'large';

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
  size: DropdownButtonSize;
  open: boolean;
  width?: string;
}

const Container = styled.button<ContainerProps>`
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;

  font-weight: 500;
  border-radius: 0.25rem;
  border: 1px solid ${gray[400]};
  background-color: white;

  cursor: pointer;

  &:hover {
    background-color: ${gray[100]};
  }

  width: ${({ width }) => width};

  ${({ size }) => dropdownButtonStyle[size]};

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
  size?: DropdownButtonSize;
  width?: string;
}

const DropdownButton: React.FC<Props> = ({
  children,
  label,
  width,
  size = 'medium',
  ...props
}) => {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLButtonElement | null>(null);

  useOutsideClick(dropdownRef, () => setOpen(false));

  return (
    <Container
      width={width}
      size={size}
      open={open}
      onClick={() => setOpen((prev) => !prev)}
      {...props}
      ref={dropdownRef}
    >
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
