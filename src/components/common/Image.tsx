import { gray } from '@lib/styles/palette';
import React from 'react';
import styled, { css } from 'styled-components';

type ImageShape = 'squared' | 'boxier';

const imageShapeStyle = {
  squared: css``,
  boxier: css`
    border-radius: 1rem;

    .image {
      border-radius: 1rem;
    }
  `,
};

interface ContainerProps {
  width: string;
  height: string;
  shape: ImageShape;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${gray[100]};

  min-width: ${({ width }) => width};
  height: ${({ height }) => height};

  .image {
    width: 100%;
    height: 100%;
  }

  ${({ shape }) => imageShapeStyle[shape]};
`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  width: string;
  height: string;
  shape?: ImageShape;
}

const Image: React.FC<Props> = ({
  src,
  width,
  height,
  alt = 'image',
  shape = 'squared',
  ...props
}) => {
  return (
    <Container width={width} height={height} shape={shape} {...props}>
      {src !== '' && src !== undefined && (
        <img className="image" src={src} alt={alt} />
      )}
    </Container>
  );
};

export default React.memo(Image);
