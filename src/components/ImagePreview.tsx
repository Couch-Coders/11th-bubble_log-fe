import { gray } from '@lib/styles/palette';
import { theme } from '@lib/styles/theme';
import React from 'react';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';

import Flexbox from './common/Flexbox';

const Container = styled.ul`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 154px;
  border: 1px solid ${gray[300]};
  padding: 0.75rem;
  border-radius: 0.5rem;
  width: 100%;
  overflow-x: scroll;

  .image-item {
    position: relative;
    height: 8rem;
    min-width: 8rem;
    max-width: 8rem;
    border-radius: 0.5rem;
    border: 1px solid ${gray[200]};
    overflow: hidden;
  }

  .uploaded-image {
    height: 100%;
  }

  .file-input-description {
    color: ${gray[300]};
  }

  .remove-button {
    position: absolute;
    width: 1rem;
    height: 1rem;
    top: 0.5rem;
    right: 0.5rem;
    border: none;
    color: white;
    background-color: ${theme.primary};
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      background-color: ${theme.primaryVariant};
    }

    .close-icon {
      width: 0.75rem;
      height: 0.75rem;
      transform: translate(-0.23rem, 0.5px);
    }
  }
`;

interface Props {
  imageFileUrlList: string[];
  onRemoveButtonClick: (imageFileIndex: number, imageFileUrl: string) => void;
}

const ImagePreview: React.FC<Props> = ({
  imageFileUrlList,
  onRemoveButtonClick,
}) => {
  return (
    <Container>
      {imageFileUrlList.length === 0 && (
        <Flexbox width="100%">
          <p className="file-input-description">추가된 이미지가 없습니다.</p>
        </Flexbox>
      )}
      {imageFileUrlList.map((imageFileUrl, index) => (
        <li className="image-item" key={index}>
          <img className="uploaded-image" src={imageFileUrl} alt="image" />
          <button
            className="remove-button"
            onClick={() => onRemoveButtonClick(index, imageFileUrl)}
          >
            <MdClose className="close-icon" />
          </button>
        </li>
      ))}
    </Container>
  );
};

export default ImagePreview;
