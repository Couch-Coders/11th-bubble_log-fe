import useOutsideClick from '@hooks/useOutsideClick';
import { theme } from '@lib/styles/theme';
import React, { useRef } from 'react';
import styled from 'styled-components';

interface ContainerProps {
  width?: string;
  height?: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 4rem;
  right: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: ${theme.elevation4};
  z-index: 3;

  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  width?: string;
  height?: string;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({
  children,
  isOpen,
  width,
  height,
  onClose,
  ...props
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(modalRef, onClose);

  return (
    <>
      {isOpen && (
        <Container width={width} height={height} ref={modalRef} {...props}>
          {children}
        </Container>
      )}
    </>
  );
};

export default React.memo(Modal);
