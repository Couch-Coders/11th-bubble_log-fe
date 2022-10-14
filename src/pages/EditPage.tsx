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
  const logId = Number(params.id);

  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.logDetail);

  useEffect(() => {
    if (data === null) {
      void dispatch(fetchLogDetail(logId));
    }
  }, []);

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
    navigate(`/log/${logId}`);
  };

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<any> => {
    setIsLoading(true);

    event.preventDefault();
    console.log('submit');

    const body = {
      date: JSON.stringify(date),
      diveType,
      enterTime: JSON.stringify(enterTime),
      leaveTime: JSON.stringify(leaveTime),
      sight: Number(sight),
      maxDepth: Number(maxDepth),
      temperature: Number(temperature),
      maxOxygen: Number(maxOxygen),
      minOxygen: Number(minOxygen),
      location: 'location',
      content,
      longitude: 1,
      latitude: 1,
      images: [],
    };
    try {
      const response = await updateLogAPI(body, logId);
      console.log(response);
      navigate(`/log/${logId}`);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(imageFile);
  console.log(position.lat, position.lng);

  return (
    <Layout>
      {isLoading && 'loading...'}
      <form
        onSubmit={() => {
          void onSubmit;
        }}
      >
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
        <button>수정하기</button>
      </form>
      <Input type="file" onChange={onChangeImageFile} />
      <label>노트</label>
      <Textarea value={content} onChange={onChangeDescription} />
      <KakaoMap position={position} setPosition={setPosition} />
      <button onClick={onClickCancelButton}>취소하기</button>
    </Layout>
  );
};

export default EditPage;
