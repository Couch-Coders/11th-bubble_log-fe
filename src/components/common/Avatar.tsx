import { gray } from '@lib/styles/palette';
import React from 'react';
import styled, { css } from 'styled-components';

const avatarShapeStyle = {
  rounded: css`
    border-radius: 50%;

    .image {
      border-radius: 50%;
    }
  `,
  boxier: css`
    border-radius: 0.25rem;

    .image {
      border-radius: 0.25rem;
    }
  `,
};

interface ContainerProps {
  size: string;
  shape: 'rounded' | 'boxier';
  clickable: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${gray[100]};

  width: ${({ size }) => size};
  height: ${({ size }) => size};

  ${({ clickable }) =>
    clickable &&
    css`
      cursor: pointer;
    `}

  .image {
    width: 100%;
    height: 100%;
  }

  ${({ shape }) => avatarShapeStyle[shape]};
`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: string;
  shape?: 'rounded' | 'boxier';
  clickable?: boolean;
}

const Avatar: React.FC<Props> = ({
  src,
  alt = 'image',
  size = '36px',
  shape = 'rounded',
  clickable = false,
  ...props
}) => {
  return (
    <Container size={size} shape={shape} clickable={clickable} {...props}>
      {src !== '' && src !== undefined && (
        <img className="image" src={src} alt={alt} width={size} height={size} />
      )}
    </Container>
  );
};

export default React.memo(Avatar);
