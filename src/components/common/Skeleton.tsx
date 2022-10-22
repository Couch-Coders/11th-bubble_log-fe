import { gray } from '@lib/styles/palette';
import React from 'react';
import styled, { css } from 'styled-components';

type SkeletonVariant = 'circular' | 'rectangular' | 'rounded';

interface ContainerProps {
  variant: SkeletonVariant;
  width: string;
  height: string;
}

const SkeletonVariantStyle = {
  circular: css`
    border-radius: 50%;
  `,
  rounded: css`
    border-radius: 0.5rem;
  `,
  rectangular: css``,
};

const Container = styled.div<ContainerProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${gray[100]};
  position: relative;
  overflow: hidden;

  ${({ variant }) => SkeletonVariantStyle[variant]};

  .wave {
    position: absolute;
    left: 0;
    right: 0;
    height: 100%;
    background-image: linear-gradient(90deg, ${gray[100]}, white, ${gray[100]});
    transform: translateX(-100%);
    animation: wave 1.5s ease-in-out infinite;
  }

  @keyframes wave {
    100% {
      transform: translateX(100%);
    }
  }
`;

interface Props {
  variant?: SkeletonVariant;
  width: string;
  height: string;
}

const Skeleton: React.FC<Props> = ({
  variant = 'rectangular',
  width,
  height,
}) => {
  return (
    <Container variant={variant} width={width} height={height}>
      <div className="wave" />
    </Container>
  );
};

export default Skeleton;
