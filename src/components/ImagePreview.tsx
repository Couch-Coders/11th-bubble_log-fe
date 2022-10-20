import { gray } from '@lib/styles/palette';
import { theme } from '@lib/styles/theme';
import React from 'react';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 8rem;
  height: 8rem;
  overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid ${gray[200]};

  .uploaded-image {
    height: 100%;
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
  imageFileUrl: string;
  imageFileIndex: number;
  onRemoveButtonClick: (imageFileIndex: number) => void;
}

const ImagePreview: React.FC<Props> = ({
  imageFileUrl,
  imageFileIndex,
  onRemoveButtonClick,
}) => {
  return (
    <Container>
      <img className="uploaded-image" src={imageFileUrl} alt="image" />
      <button
        className="remove-button"
        onClick={() => onRemoveButtonClick(imageFileIndex)}
      >
        <MdClose className="close-icon" />
      </button>
    </Container>
  );
};

export default ImagePreview;
