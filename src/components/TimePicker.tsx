import useOutsideClick from '@hooks/useOutsideClick';
import { gray } from '@lib/styles/palette';
import { format } from 'date-fns';
import React, { useRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import styled from 'styled-components';

const TimePickerButton = styled.button`
  text-align: start;
  border-radius: 0.25rem;
  border: 1px solid ${gray[400]};
  background-color: white;
  color: ${gray[300]};
  font-size: 1rem;
  height: 3rem;
  padding: 0.75rem;
  cursor: pointer;

  &:hover {
    background-color: ${gray[100]};
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1rem;
  position: relative;

  .time-picker-container {
    position: absolute;
    top: 3.5rem;
    z-index: 3;
  }
`;

interface Props {
  startTime: Date | null;
  onChange: (
    date: Date | null,
    event?: React.SyntheticEvent<any, Event> | undefined,
  ) => void;
}

const TimePicker: React.FC<Props> = ({ startTime, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (date: Date | null) => {
    onChange(date);
    setIsOpen(false);
  };

  const ref = useRef<HTMLDivElement | null>(null);

  useOutsideClick(ref, () => setIsOpen(false));

  return (
    <Container ref={ref}>
      <TimePickerButton onClick={() => setIsOpen((prev) => !prev)}>
        {startTime === null
          ? '시간을 선택하세요'
          : format(startTime, 'h:mm aa')}
      </TimePickerButton>
      {isOpen && (
        <div className="time-picker-container">
          <ReactDatePicker
            selected={startTime}
            onChange={handleChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            inline
          />
        </div>
      )}
    </Container>
  );
};

export default TimePicker;
