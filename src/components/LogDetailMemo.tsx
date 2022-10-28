import { gray } from '@lib/styles/palette';
import React from 'react';
import { BsTextLeft } from 'react-icons/bs';
import styled from 'styled-components';

import Flexbox from '@components/common/Flexbox';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  color: ${gray[600]};

  .memo-container {
    border: 1px solid ${gray[200]};
    border-radius: 0.5rem;
    min-height: 8rem;
    padding: 1rem;
  }
`;

interface Props {
  memo: string;
}

const LogDetailMemo: React.FC<Props> = ({ memo }) => {
  return (
    <Container>
      <div className="memo-container">
        {memo === '' && (
          <Flexbox flex="col" gap="1rem" width="100%" height="8rem">
            <BsTextLeft size="2rem" color={gray[300]} />
            <p className="no-image-description" style={{ color: gray[300] }}>
              작성한 메모가 없습니다.
            </p>
          </Flexbox>
        )}
        {memo}
      </div>
    </Container>
  );
};

export default LogDetailMemo;
