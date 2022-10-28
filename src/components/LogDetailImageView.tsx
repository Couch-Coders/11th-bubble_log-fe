import { gray } from '@lib/styles/palette';
import React from 'react';
import { MdOutlineImage } from 'react-icons/md';
import styled from 'styled-components';

import Flexbox from '@components/common/Flexbox';
import Image from '@components/common/Image';
import { BASE_URL } from '@utils/constants';

const Container = styled.div`
  width: 100%;

  .no-image-description {
    color: ${gray[300]};
  }

  .image-view-comment {
    font-size: 0.875rem;
    color: ${gray[400]};
  }
`;

interface Props {
  images: string[];
}

const LogDetailImageView: React.FC<Props> = ({ images }) => {
  return (
    <Container>
      <Flexbox
        justify="start"
        gap="1rem"
        width="100%"
        height="16rem"
        style={{ overflowX: 'scroll' }}
      >
        {images.length === 0 && (
          <Flexbox flex="col" gap="1rem" width="100%">
            <MdOutlineImage size="2rem" color={gray[300]} />
            <p className="no-image-description">업로드한 사진이 없습니다.</p>
          </Flexbox>
        )}
        {images.map((image, index) => (
          <Image
            width="300px"
            height="200px"
            shape="boxier"
            key={index}
            src={`${BASE_URL}${image}`}
            alt="image"
          />
        ))}
      </Flexbox>
      {images.length !== 0 && (
        <Flexbox width="100%" justify="end">
          <p className="image-view-comment">
            * 클릭 시 확대해서 볼 수 있습니다.
          </p>
        </Flexbox>
      )}
    </Container>
  );
};

export default LogDetailImageView;
