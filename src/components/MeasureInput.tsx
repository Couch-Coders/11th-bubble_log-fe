import { gray } from '@lib/styles/palette';
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
`;

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  value: string;
  width?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  measure: string;
}

const MeasureInput: React.FC<Props> = ({
  value,
  measure,
  width = '100%',
  onChange,
  ...props
}) => {
  return (
    <Container width={width}>
      <Input value={value} onChange={onChange} width={width} {...props} />
      {value !== '' && <div className="floating-measure">{measure}</div>}
    </Container>
  );
};

export default MeasureInput;
