import { gray } from '@lib/styles/palette';
import { theme } from '@lib/styles/theme';
import React from 'react';
import styled from 'styled-components';

import Input from '@components/common/Input';

interface ContainerProps {
  width?: string;
}

const Container = styled.div<ContainerProps>`
  position: relative;
  width: ${({ width }) => width};

  .floating-measure {
    font-size: 1rem;
    color: ${gray[300]};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0.5rem;
  }

  .input-error-message {
    position: absolute;
    margin-top: 0.5rem;
    font-size: 0.75rem;
    color: ${theme.error};
  }
`;

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  value: string;
  width?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  measure: string;
  isValid?: boolean;
  errorMessage?: string;
}

const MeasureInput: React.FC<Props> = ({
  value,
  measure,
  width = '100%',
  onChange,
  isValid = true,
  errorMessage,
  ...props
}) => {
  return (
    <Container width={width}>
      <Input
        value={value}
        onChange={onChange}
        width={width}
        isValid={isValid}
        {...props}
      />
      {value !== '' && <div className="floating-measure">{measure}</div>}
      {!isValid && <p className="input-error-message">{errorMessage}</p>}
    </Container>
  );
};

export default MeasureInput;
