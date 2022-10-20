import { logAPI } from '@lib/apis/log';
import { theme } from '@lib/styles/theme';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@components/common/Button';
import FileInput from '@components/common/FileInput';
import Flexbox from '@components/common/Flexbox';
import Input from '@components/common/Input';
import Textarea from '@components/common/Textarea';
import DatePicker from '@components/DatePicker';
import ImagePreview from '@components/ImagePreview';
import KakaoMap from '@components/KakaoMap';
import Layout from '@components/Layout';
import MeasureInput from '@components/MeasureInput';
import TimePicker from '@components/TimePicker';
import { DIVE_TYPE } from '@utils/constants';

import 'react-datepicker/dist/react-datepicker.css';

const NUMBER_REG_EXP = /^[0-9]$/g;

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
  const [imageFileUrlList, setImageFileUrlList] = useState<string[]>([]);
  const [imageFileList, setImageFileList] = useState<File[]>([]);
  const [content, setContent] = useState('');
  const [position, setPosition] = useState({
    lat: 33.55635,
    lng: 126.795841,
  });

  const navigate = useNavigate();

  const isValidated =
    diveType !== '' &&
    temperature !== '' &&
    maxDepth !== '' &&
    sight !== '' &&
    minOxygen !== '' &&
    maxOxygen !== '' &&
    content !== '';

  const handleDatePickerChange = (date: Date | null) => {
    if (date === null) return;
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
    if (!NUMBER_REG_EXP.test(event.target.value)) return;
    setTemperature(event.target.value);
  };

  const handleMaxDepthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxDepth(event.target.value);
  };

  const handleSightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSight(event.target.value);
  };

  const handleEnterTimeChange = (date: Date | null) => {
    if (date === null) return;
    setEnterTime(date);
  };

  const handleLeaveTimeChange = (date: Date | null) => {
    if (date === null) return;
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
    if (event.target.files === null) return;
    // (prev => [...prev, event.target.files[0]]) causes nullable issue
    setImageFileList([...imageFileList, event.target.files[0]]);
    setImageFile(event.target.files[0]);
    event.target.value = '';
  };

  useEffect(() => {
    if (imageFile === null) return;

    const fileReader = new FileReader();

    // event.target possibly null?
    fileReader.onload = (event) => {
      setImageFileUrlList((prev) => [...prev, event.target?.result as string]);
    };

    fileReader.readAsDataURL(imageFile);
  }, [imageFile]);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setContent(event.target.value);
  };

  const handleCancelButtonClick = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    if (diveType === '') return;

    console.log('submitting...');

    setIsLoading(true);

    const createLogBody = {
      date: date.toISOString().slice(0, -1),
      diveType,
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
    console.log('@body', createLogBody);

    try {
      const createLogResponse = await logAPI.createLog(createLogBody);

      if (imageFileList.length === 0) return;

      const formData = new FormData();

      imageFileList.forEach((imageFile) => {
        formData.append('images', imageFile);
      });

      const createLogImagesResponse = await logAPI.createLogImages(
        formData,
        String(createLogResponse.id),
      );
      console.log('@createLogImagesResponse', createLogImagesResponse);

      setIsLoading(false);
      navigate('/logs');
    } catch (error) {
      console.log(error);
    }
  };

  const removeImageFileUrl = (imageFileIndex: number) => {
    setImageFileUrlList((imageFileUrlList) =>
      imageFileUrlList.filter((_, index) => imageFileIndex !== index),
    );
  };

  return (
    <Layout>
      <Flexbox padding="1rem" flex="col" items="start" gap="1rem">
        <h1
          style={{
            color: theme.primary,
            fontSize: '3rem',
            fontWeight: 600,
            marginTop: '2rem',
            marginBottom: '1rem',
          }}
        >
          새 로그 생성
        </h1>
        {isLoading && 'loading...'}
        <DatePicker startDate={date} onChange={handleDatePickerChange} />
        <select onChange={handleDiveTypeChange} defaultValue="type">
          <option value="type" disabled>
            다이브 종류
          </option>
          {DIVE_TYPE.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
        <Flexbox gap="1rem">
          <label>수온</label>
          <MeasureInput
            value={temperature}
            measure="°"
            onChange={handleTemperatureChange}
            placeholder="수온을 입력하세요."
          />
        </Flexbox>
        <Flexbox gap="1rem">
          <label>최고 깊이</label>
          <MeasureInput
            value={maxDepth}
            measure="m"
            onChange={handleMaxDepthChange}
            placeholder="최고 깊이를 입력하세요."
          />
        </Flexbox>
        <Flexbox gap="1rem">
          <label>시야</label>
          <Input
            value={sight}
            onChange={handleSightChange}
            placeholder="시야를 입력하세요."
          />
        </Flexbox>
        <Flexbox gap="1rem">
          <label>들어간 시간</label>
          <TimePicker startTime={enterTime} onChange={handleEnterTimeChange} />
        </Flexbox>
        <Flexbox gap="1rem">
          <label>나온 시간</label>
          <TimePicker startTime={leaveTime} onChange={handleLeaveTimeChange} />
        </Flexbox>
        <Flexbox gap="1rem">
          <label>들어갈 때 탱크량</label>
          <Input
            value={maxOxygen}
            onChange={handleMaxOxygenChange}
            placeholder="들어갈 때 탱크량을 입력하세요."
          />
        </Flexbox>
        <Flexbox gap="1rem">
          <label>나올 때 탱크량</label>
          <Input
            value={minOxygen}
            onChange={handleMinOxygenChange}
            placeholder="나올 때 탱크량을 입력하세요."
          />
        </Flexbox>
        <label>메모</label>
        <Textarea
          value={content}
          onChange={handleDescriptionChange}
          placeholder="여기에 메모를 입력하세요."
        />
        <FileInput onChange={handleImageFileChange} />
        <Flexbox justify="start" gap="1rem" flexWrap>
          {imageFileUrlList.map((imageFileUrl, index) => (
            <ImagePreview
              key={index}
              imageFileUrl={imageFileUrl}
              imageFileIndex={index}
              onRemoveButtonClick={() => removeImageFileUrl(index)}
            />
          ))}
        </Flexbox>
      </Flexbox>
      <KakaoMap position={position} setPosition={setPosition} />
      <Flexbox padding="1rem" width="100%" justify="between">
        <Button>임시 저장</Button>
        <Flexbox gap="1rem">
          <Button variant="text" onClick={handleCancelButtonClick}>
            돌아가기
          </Button>
          <Button
            onClick={() => {
              void handleSubmit();
            }}
            disabled={!isValidated}
          >
            생성하기
          </Button>
        </Flexbox>
      </Flexbox>
    </Layout>
  );
};

export default WritePage;
