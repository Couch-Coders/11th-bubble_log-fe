import useOutsideClick from '@hooks/useOutsideClick';
import { theme } from '@lib/styles/theme';
import { format } from 'date-fns';
import React, { useRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import styled from 'styled-components';

const DatePickerButton = styled.button`
  border-radius: 0.5rem;
  border: none;
  background-color: ${theme.primary};
  color: white;
  font-size: 1.25rem;
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: ${theme.primaryVariant};
  }
`;

const Container = styled.div`
  display: flex;
  width: 12rem;
  flex-direction: column;
  gap: 1rem;
  position: relative;

  .date-picker-container {
    position: absolute;
    top: 3.5rem;
    z-index: 3;
  }
`;

interface Props {
  startDate: Date;
  onChange: (
    date: Date | null,
    event?: React.SyntheticEvent<any, Event> | undefined,
  ) => void;
}

const DatePicker: React.FC<Props> = ({ startDate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (date: Date | null) => {
    onChange(date);
    setIsOpen(false);
  };

  const ref = useRef<HTMLDivElement | null>(null);

  useOutsideClick(ref, () => setIsOpen(false));

  return (
    <Container ref={ref}>
      <DatePickerButton onClick={() => setIsOpen((prev) => !prev)}>
        {format(startDate, 'yyyy년 MM월 dd일')}
      </DatePickerButton>
      {isOpen && (
        <div className="date-picker-container">
          <ReactDatePicker
            selected={startDate}
            onChange={handleChange}
            inline
          />
        </div>
      )}
    </Container>
  );
};

export default DatePicker;
