import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';

import { createLogAPI } from '@apis/log';
import Input from '@components/common/Input';
import Textarea from '@components/common/Textarea';
import KakaoMap from '@components/KakaoMap';
import { DIVE_TYPE } from '@utils/constants';

import 'react-datepicker/dist/react-datepicker.css';

const WritePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [diveType, setDiveType] = useState('');
  const [temperature, setTemperature] = useState('');
  const [maxDepth, setMaxDepth] = useState('');
  const [sight, setSight] = useState('');
  const [enterTime, setEnterTime] = useState(new Date());
  const [leaveTime, setLeaveTime] = useState(new Date());
  const [minOxygen, setMinOxygen] = useState('');
  const [maxOxygen, setMaxOxygen] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [content, setContent] = useState('');
  const [position, setPosition] = useState({
    lat: 33.55635,
    lng: 126.795841,
  });

  const navigate = useNavigate();

  const onChangeDatePicker = (date: Date): void => {
    setDate(date);
  };

  const onChangeDiveType = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setDiveType(event.target.value);
  };

  const onChangeTemperature = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setTemperature(event.target.value);
  };

  const onChangeMaxDepth = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setMaxDepth(event.target.value);
  };

  const onChangeSight = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSight(event.target.value);
  };

  const onChangeEnterTime = (date: Date): void => {
    setEnterTime(date);
  };

  const onChangeLeaveTime = (date: Date): void => {
    setLeaveTime(date);
  };

  const onChangeMinOxygen = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setMinOxygen(event.target.value);
  };

  const onChangeMaxOxygen = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setMaxOxygen(event.target.value);
  };

  const onChangeImageFile = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (event.target.files !== null) {
      setImageFile(event.target.files[0]);
    }
  };

  const onChangeDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setContent(event.target.value);
  };

  const onClickCancelButton = (): void => {
    navigate(-1);
  };

  const onClickSubmitButton = async (): Promise<any> => {
    console.log('submitting...');

    setIsLoading(true);

    const body = {
      date: date.toISOString().slice(0, -1),
      diveType: 'FREE',
      enterTime: enterTime.toISOString().slice(0, -1),
      leaveTime: leaveTime.toISOString().slice(0, -1),
      sight: Number(sight),
      maxDepth: Number(maxDepth),
      temperature: Number(temperature),
      maxOxygen: Number(maxOxygen),
      minOxygen: Number(minOxygen),
      location: '서울시 서초구',
      content,
      longitude: position.lat,
      latitude: position.lng,
    };
    console.log('@body', body);
    try {
      const response = await createLogAPI(body);
      console.log(response);
      navigate('/logs');
    } catch (error) {
      console.log(error);
    }
  };

  console.log(imageFile);
  console.log(diveType);

  return (
    <main>
      {isLoading && 'loading...'}
      <DatePicker selected={date} onChange={onChangeDatePicker} />
      <select onChange={onChangeDiveType} defaultValue="type">
        <option value="type" disabled>
          다이브 종류
        </option>
        {DIVE_TYPE.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
      <label>수온</label>
      <Input value={temperature} onChange={onChangeTemperature} />
      <label>최고 깊이</label>
      <Input value={maxDepth} onChange={onChangeMaxDepth} />
      <label>시야</label>
      <Input value={sight} onChange={onChangeSight} />
      <label>들어간 시간</label>
      <DatePicker
        selected={enterTime}
        onChange={onChangeEnterTime}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
      />
      <label>나온 시간</label>
      <DatePicker
        selected={leaveTime}
        onChange={onChangeLeaveTime}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
      />
      <label>들어갈 때 탱크량</label>
      <Input value={maxOxygen} onChange={onChangeMaxOxygen} />
      <label>나올 때 탱크량</label>
      <Input value={minOxygen} onChange={onChangeMinOxygen} />
      <button
        type="button"
        onClick={() => {
          void onClickSubmitButton();
        }}
      >
        생성하기
      </button>
      <button onClick={onClickCancelButton}>돌아가기</button>
      <input type="file" onChange={onChangeImageFile} />
      <label>노트</label>
      <Textarea value={content} onChange={onChangeDescription} />
      <KakaoMap position={position} setPosition={setPosition} />
    </main>
  );
};

export default WritePage;
