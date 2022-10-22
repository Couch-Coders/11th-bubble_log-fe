import { theme } from '@lib/styles/theme';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  .loader,
  .loader:after {
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
  }
  .loader {
    position: relative;
    border-top: 0.4rem solid ${theme.primary};
    border-right: 0.4rem solid ${theme.primary};
    border-bottom: 0.4rem solid ${theme.primary};
    border-left: 0.4rem solid white;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 0.8s infinite linear;
    animation: load8 0.8s infinite linear;
  }

  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

const LoadingSpinner: React.FC = () => {
  return (
    <Container>
      <div className="loader" />
    </Container>
  );
};

export default LoadingSpinner;
