import { logAPI } from '@lib/apis/log';
import { theme } from '@lib/styles/theme';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@components/common/Button';
import FileInput from '@components/common/FileInput';
import Flexbox from '@components/common/Flexbox';
import Input from '@components/common/Input';
import Snackbar from '@components/common/Snackbar';
import Textarea from '@components/common/Textarea';
import DatePicker from '@components/DatePicker';
import ImagePreview from '@components/ImagePreview';
import KakaoMap from '@components/KakaoMap';
import Layout from '@components/Layout';
import LoadingBackdrop from '@components/LoadingBackdrop';
import MeasureInput from '@components/MeasureInput';
import TempPostPromptModal from '@components/TempPostPromptModal';
import TimePicker from '@components/TimePicker';
import { DIVE_TYPE } from '@utils/constants';

import 'react-datepicker/dist/react-datepicker.css';

const WritePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [diveType, setDiveType] = useState('');
  const [temperature, setTemperature] = useState('');
  const [maxDepth, setMaxDepth] = useState('');
  const [sight, setSight] = useState('');
  const [enterTime, setEnterTime] = useState<Date | null>(null);
  const [leaveTime, setLeaveTime] = useState<Date | null>(null);
  const [minOxygen, setMinOxygen] = useState('');
  const [maxOxygen, setMaxOxygen] = useState('');
  const [imageFileUrlList, setImageFileUrlList] = useState<string[]>([]);
  const [imageFileList, setImageFileList] = useState<File[]>([]);
  const [content, setContent] = useState('');
  const [position, setPosition] = useState({
    lat: 33.55635,
    lng: 126.795841,
  });

  const [isTempPostPromptModalOpen, setIsTempPostPromptModalOpen] =
    useState(false);
  const [isTempPostSnackbarOpen, setIsTempPostSnackbarOpen] = useState(false);

  const loadTempPost = () => {
    const tempPost = localStorage.getItem('temp');
    if (tempPost === null) return;

    const tempPostData = JSON.parse(tempPost);
    console.log('@tempPostData', tempPostData);

    if (tempPostData.date !== null) setDate(new Date(tempPostData.date));
    setDiveType(tempPostData.diveType);
    if (tempPostData.enterTime !== null)
      setEnterTime(new Date(tempPostData.enterTime));
    if (tempPostData.leaveTime !== null)
      setLeaveTime(new Date(tempPostData.leaveTime));
    setPosition({
      lat: tempPostData.latitude,
      lng: tempPostData.longitude,
    });
    setMaxDepth(tempPostData.maxDepth);
    setMinOxygen(tempPostData.minOxygen);
    setSight(tempPostData.sight);
    setTemperature(tempPostData.temperature);
  };

  const removeTempPost = () => {
    localStorage.removeItem('temp');
  };

  const handleTempPostPromptModalConfirm = () => {
    loadTempPost();
    setIsTempPostPromptModalOpen(false);
    setIsTempPostSnackbarOpen(true);
  };

  const handleTempPostPromptModalClose = () => {
    removeTempPost();
    setIsTempPostPromptModalOpen(false);
  };

  useEffect(() => {
    if (localStorage.getItem('temp') !== null)
      setIsTempPostPromptModalOpen(true);
  }, []);

  const navigate = useNavigate();

  const isValidated =
    diveType !== '' &&
    temperature !== '' &&
    maxDepth !== '' &&
    sight !== '' &&
    minOxygen !== '' &&
    maxOxygen !== '' &&
    content !== '' &&
    enterTime !== null &&
    leaveTime !== null &&
    date !== null;

  const loadImageFile = (
    imageFile: File,
    onLoad: (event: ProgressEvent<FileReader>) => void,
  ) => {
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      onLoad(event);
    };

    fileReader.readAsDataURL(imageFile);
  };

  const handleImageFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files === null) return;

    console.log(event.target.files[0]);

    setImageFileList([...imageFileList, event.target.files[0]]);

    loadImageFile(event.target.files[0], (e) => {
      setImageFileUrlList((prev) => [...prev, e.target?.result as string]);
    });

    event.target.value = '';
  };

  const handleCancelButtonClick = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    if (
      diveType === '' ||
      date === null ||
      enterTime === null ||
      leaveTime === null
    )
      return;

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

      if (imageFileList.length === 0) return navigate('/logs');

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
    } finally {
      setIsLoading(false);
    }
  };

  const removeImageFileUrl = (imageFileIndex: number) => {
    setImageFileUrlList((imageFileUrlList) =>
      imageFileUrlList.filter((_, index) => imageFileIndex !== index),
    );
  };

  const handleTempSaveButtonClick = () => {
    const tempPostData = {
      date,
      diveType,
      enterTime,
      leaveTime,
      sight,
      maxDepth,
      temperature,
      maxOxygen,
      minOxygen,
      location: '서울특별시',
      content,
      longitude: position.lat,
      latitude: position.lng,
    };

    localStorage.setItem('temp', JSON.stringify(tempPostData));
  };

  return (
    <Layout>
      <LoadingBackdrop isOpen={isLoading} />
      <TempPostPromptModal
        isOpen={isTempPostPromptModalOpen}
        onConfirm={handleTempPostPromptModalConfirm}
        onClose={handleTempPostPromptModalClose}
      />
      <Snackbar
        isOpen={isTempPostSnackbarOpen}
        onClose={() => setIsTempPostSnackbarOpen(false)}
        message="임시 저장된 글을 불러왔습니다."
      />
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
        <DatePicker startDate={date} onChange={setDate} />
        <select
          onChange={(e) => setDiveType(e.target.value)}
          defaultValue="type"
        >
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
            onChange={(e) => setTemperature(e.target.value)}
            placeholder="수온을 입력하세요."
          />
        </Flexbox>
        <Flexbox gap="1rem">
          <label>최고 깊이</label>
          <MeasureInput
            value={maxDepth}
            measure="m"
            onChange={(e) => setMaxDepth(e.target.value)}
            placeholder="최고 깊이를 입력하세요."
          />
        </Flexbox>
        <Flexbox gap="1rem">
          <label>시야</label>
          <Input
            value={sight}
            onChange={(e) => setSight(e.target.value)}
            placeholder="시야를 입력하세요."
          />
        </Flexbox>
        <Flexbox gap="1rem">
          <label>들어간 시간</label>
          <TimePicker startTime={enterTime} onChange={setEnterTime} />
        </Flexbox>
        <Flexbox gap="1rem">
          <label>나온 시간</label>
          <TimePicker startTime={leaveTime} onChange={setLeaveTime} />
        </Flexbox>
        <Flexbox gap="1rem">
          <label>들어갈 때 탱크량</label>
          <Input
            value={maxOxygen}
            onChange={(e) => setMaxOxygen(e.target.value)}
            placeholder="들어갈 때 탱크량을 입력하세요."
          />
        </Flexbox>
        <Flexbox gap="1rem">
          <label>나올 때 탱크량</label>
          <Input
            value={minOxygen}
            onChange={(e) => setMinOxygen(e.target.value)}
            placeholder="나올 때 탱크량을 입력하세요."
          />
        </Flexbox>
        <label>메모</label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
        <Button variant="text" onClick={handleCancelButtonClick}>
          돌아가기
        </Button>
        <Flexbox gap="1rem">
          <Button variant="outlined" onClick={handleTempSaveButtonClick}>
            임시 저장
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
