import { theme } from '@lib/styles/theme';
import React from 'react';
import { MdFileUpload } from 'react-icons/md';
import styled from 'styled-components';

const Container = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 12rem;
  border: 2px dotted ${theme.primary};
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: ${theme.primaryLight};
  }

  .file-upload-icon {
    width: 2rem;
    height: 2rem;
    color: ${theme.primary};
  }
`;

interface Props extends React.HTMLAttributes<HTMLInputElement> {}

const FileInput: React.FC<Props> = ({ ...props }) => {
  return (
    <Container>
      <MdFileUpload className="file-upload-icon" />
      <input type="file" accept="image" hidden {...props} />
    </Container>
  );
};

export default FileInput;
