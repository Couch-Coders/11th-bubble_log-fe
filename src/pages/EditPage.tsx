import { useDispatch, useSelector } from '@stores/index';
import { fetchLogDetail } from '@stores/slices/logDetail';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate, useParams } from 'react-router-dom';

import { updateLogAPI } from '@apis/log';
import Input from '@components/common/Input';
import Textarea from '@components/common/Textarea';
import KakaoMap from '@components/KakaoMap';
import Layout from '@components/Layout';
import { DIVE_TYPE } from '@utils/constants';

const EditPage: React.FC = () => {
  const navigate = useNavigate();

  const params = useParams();
  const logId = params.id as string;

  const { data } = useSelector((state) => state.logDetail);

  const dispatch = useDispatch();

  useEffect(() => {
    void dispatch(fetchLogDetail(logId));
  }, [logId]);

  const initialDate = data !== null ? new Date(data.date) : new Date();
  const initialDiveType = data !== null ? data.diveType : '';
  const initialTemperature = data !== null ? data.temperature : '';
  const initialMaxDepth = data !== null ? data.maxDepth : '';
  const initialSight = data !== null ? data.sight : '';
  const initialEnterTime =
    data !== null ? new Date(data.enterTime) : new Date();
  const initialLeaveTime =
    data !== null ? new Date(data.leaveTime) : new Date();
  const initialMinOxygen = data !== null ? data.minOxygen : '';
  const initialMaxOxygen = data !== null ? data.maxOxygen : '';
  const initialImageFile = data !== null ? data.images[0] : '';
  console.log(initialImageFile);
  const initialContent = data !== null ? data.content : '';
  const initialPosition =
    data !== null
      ? {
          lat: data.latitude,
          lng: data.longitude,
        }
      : {
          lat: 33.55635,
          lng: 126.795841,
        };
  const initialLocation = data !== null ? data.location : '';

  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(initialDate);
  const [diveType, setDiveType] = useState(initialDiveType);
  const [temperature, setTemperature] = useState(initialTemperature);
  const [maxDepth, setMaxDepth] = useState(initialMaxDepth);
  const [sight, setSight] = useState(initialSight);
  const [enterTime, setEnterTime] = useState(initialEnterTime);
  const [leaveTime, setLeaveTime] = useState(initialLeaveTime);
  const [minOxygen, setMinOxygen] = useState(initialMinOxygen);
  const [maxOxygen, setMaxOxygen] = useState(initialMaxOxygen);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [content, setContent] = useState(initialContent);
  const [position, setPosition] = useState(initialPosition);
  const [location, setLocation] = useState(initialLocation);

  const handleDatePickerChange = (date: Date): void => {
    setDate(date);
  };

  const handleDiveTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setDiveType(event.target.value);
  };

  const handleTemperatureChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setTemperature(event.target.value);
  };

  const handleMaxDepthChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setMaxDepth(event.target.value);
  };

  const handleSightChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setSight(event.target.value);
  };

  const handleEnterTimeChange = (date: Date): void => {
    setEnterTime(date);
  };

  const handleLeaveTimeChange = (date: Date): void => {
    setLeaveTime(date);
  };

  const handleMinOxygenChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setMinOxygen(event.target.value);
  };

  const handleMaxOxygenChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setMaxOxygen(event.target.value);
  };

  const handleImageFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (event.target.files !== null) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setContent(event.target.value);
  };

  const handleCancelButtonClick = (): void => {
    navigate(`/log/${logId}`);
  };

  const handleSubmit = async (): Promise<any> => {
    if (data === null) return;
    setIsLoading(true);
    console.log('submit');

    const body = {
      date: date.toISOString().slice(0, -1),
      diveType,
      enterTime: enterTime.toISOString().slice(0, -1),
      leaveTime: leaveTime.toISOString().slice(0, -1),
      sight: Number(sight),
      maxDepth: Number(maxDepth),
      temperature: Number(temperature),
      maxOxygen: Number(maxOxygen),
      minOxygen: Number(minOxygen),
      location,
      content,
      longitude: position.lng,
      latitude: position.lat,
    };
    console.log('@body', body);

    try {
      const response = await updateLogAPI(body, String(data.id));
      console.log(response);
      navigate(`/log/${logId}`);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(imageFile);
  console.log(setLocation);

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
        onClick={() => {
          void handleSubmit();
        }}
      >
        수정하기
      </button>
      <Input type="file" onChange={handleImageFileChange} />
      <label>노트</label>
      <Textarea value={content} onChange={handleDescriptionChange} />
      <KakaoMap position={position} setPosition={setPosition} />
      <button onClick={handleCancelButtonClick}>취소하기</button>
    </Layout>
  );
};

export default EditPage;
