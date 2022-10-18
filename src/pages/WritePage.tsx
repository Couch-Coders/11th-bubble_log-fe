import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';

import { logAPI } from '@apis/log';
import Input from '@components/common/Input';
import Textarea from '@components/common/Textarea';
import KakaoMap from '@components/KakaoMap';
import Layout from '@components/Layout';
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

  const handleDatePickerChange = (date: Date) => {
    setDate(date);
  };

  const handleDiveTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setDiveType(event.target.value);
  };

  const handleTemperatureChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTemperature(event.target.value);
  };

  const handleMaxDepthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxDepth(event.target.value);
  };

  const handleSightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSight(event.target.value);
  };

  const handleEnterTimeChange = (date: Date) => {
    setEnterTime(date);
  };

  const handleLeaveTimeChange = (date: Date) => {
    setLeaveTime(date);
  };

  const handleMinOxygenChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setMinOxygen(event.target.value);
  };

  const handleMaxOxygenChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setMaxOxygen(event.target.value);
  };

  const handleImageFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files !== null) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setContent(event.target.value);
  };

  const handleCancelButtonClick = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
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
      location: '서울특별시',
      content,
      longitude: position.lat,
      latitude: position.lng,
    };
    console.log('@body', body);
    try {
      const response = await logAPI.createLog(body);
      console.log(response);
      navigate('/logs');
    } catch (error) {
      console.log(error);
    }
  };

  console.log(imageFile);
  console.log(diveType);

  return (
    <Layout>
      {isLoading && 'loading...'}
      <DatePicker selected={date} onChange={handleDatePickerChange} />
      <select onChange={handleDiveTypeChange} defaultValue="type">
        <option value="type" disabled>
          다이브 종류
        </option>
        {DIVE_TYPE.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
      <label>수온</label>
      <Input value={temperature} onChange={handleTemperatureChange} />
      <label>최고 깊이</label>
      <Input value={maxDepth} onChange={handleMaxDepthChange} />
      <label>시야</label>
      <Input value={sight} onChange={handleSightChange} />
      <label>들어간 시간</label>
      <DatePicker
        selected={enterTime}
        onChange={handleEnterTimeChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
      />
      <label>나온 시간</label>
      <DatePicker
        selected={leaveTime}
        onChange={handleLeaveTimeChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
      />
      <label>들어갈 때 탱크량</label>
      <Input value={maxOxygen} onChange={handleMaxOxygenChange} />
      <label>나올 때 탱크량</label>
      <Input value={minOxygen} onChange={handleMinOxygenChange} />
      <button
        type="button"
        onClick={() => {
          void handleSubmit();
        }}
      >
        생성하기
      </button>
      <button onClick={handleCancelButtonClick}>돌아가기</button>
      <input type="file" onChange={handleImageFileChange} />
      <label>노트</label>
      <Textarea value={content} onChange={handleDescriptionChange} />
      <KakaoMap position={position} setPosition={setPosition} />
    </Layout>
  );
};

export default WritePage;
