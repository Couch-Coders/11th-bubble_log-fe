import useOutsideClick from '@hooks/useOutsideClick';
import { gray } from '@lib/styles/palette';
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

  .react-datepicker {
    padding: 2rem;
    box-shadow: ${theme.elevation4};
    border-radius: 0.5rem;
    cursor: default;
  }

  .react-datepicker__month-container {
    padding: 0 1.5rem;
  }

  .react-datepicker__header {
    padding-top: 1rem;
    border: 0;
    background-color: white;
  }

  .react-datepicker__navigation--previous {
    top: 2.8rem;
    left: 3.5rem;
  }

  .react-datepicker__navigation--next {
    top: 2.8rem;
    right: 3.5rem;
  }

  .react-datepicker__current-month {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .react-datepicker__day-names {
    padding: 1rem 0;
  }

  .react-datepicker__day-name {
    width: 3rem;
    margin: 0;
    padding-top: 1rem;
    font-size: 1rem;
    line-height: 1rem;
    font-weight: 600;
    color: ${theme.primary};
  }

  .react-datepicker__month {
    margin: 0;
  }

  .react-datepicker__day {
    width: 3rem;
    height: 3rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    font-size: 0.875rem;
    font-weight: 600;
    background-color: white;
    color: ${gray[500]};
    outline: none;

    &:hover {
      color: ${gray[700]};
      background-color: ${gray[100]};
      border-radius: 0.5rem;
    }
  }

  .react-datepicker__day--in-range {
    background-color: ${gray[600]};
  }

  .react-datepicker__day--in-selecting-range {
    background-color: ${gray[400]};
  }

  .react-datepicker__day--selected {
    background-color: ${theme.primary};
    color: white;
    border-radius: 0.5rem;

    &:hover {
      background-color: ${theme.primary};
      color: white;
    }
  }

  .react-datepicker__day--range-start {
    background-color: ${gray[700]};
    color: white;
    border-radius: 50%;
  }

  .react-datepicker__day--range-end {
    background-color: ${gray[700]};
    color: white;
    border-radius: 50%;
  }

  .react-datepicker__day--disabled {
    color: ${gray[100]};
    cursor: no-drop;
    &:hover {
      border: 0;
    }
  }
`;

interface Props {
  startDate: Date | null;
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
        {startDate === null
          ? '날짜를 선택하세요'
          : format(startDate, 'yyyy년 MM월 dd일')}
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
