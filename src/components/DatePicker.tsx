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
    padding: 16px 32px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px !important;
    border-radius: 32px;
    cursor: default;
  }
  .react-datepicker__triangle {
    border-bottom-color: white !important;
  }
  .react-datepicker__month-container {
    padding: 0 27px;
  }
  .react-datepicker__header {
    padding-top: 22px;
    font-size: 16px;
    font-weight: 600;
    border: 0;
    background-color: white;
  }
  .react-datepicker__navigation--previous {
    top: 40px;
    left: 56px;
    border: 0;
    background-repeat: no-repeat;
  }
  .react-datepicker__navigation--next {
    top: 40px;
    right: 56px;
    border: 0;
    background-repeat: no-repeat;
  }
  .react-datepicker__current-month {
    font-size: 16px;
    font-weight: 600;
    font-family: Airbnb Cereal, sans-serif;
  }
  .react-datepicker__day-names {
    padding-top: 16px;
  }
  .react-datepicker__day-name {
    width: 48px;
    margin: 0;
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    color: ${gray[100]};
  }
  .react-datepicker__month {
    margin: 0;
  }
  .react-datepicker__day {
    width: 48px;
    height: 48px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    font-family: -apple-system, sans-serif;
    color: ${gray[700]};
    outline: none;
    &:hover {
      border: 1px solid ${gray[700]};
      color: ${gray[700]};
      background-color: white;
      border-radius: 50%;
    }
  }

  .react-datepicker__day--in-range {
    background-color: ${gray[400]};
  }
  .react-datepicker__day--in-selecting-range {
    background-color: ${gray[400]};
  }
  .react-datepicker__day--selected {
    background-color: ${gray[700]};
    color: white;
    border-radius: 50%;
    &:hover {
      background-color: ${gray[700]};

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
