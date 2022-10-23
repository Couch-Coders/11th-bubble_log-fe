import useTempPost from '@hooks/useTempPost';
import { theme } from '@lib/styles/theme';
import { useDispatch, useSelector } from '@store/index';
import { postLog, postLogActions } from '@store/slices/postLog';
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
import { readFileAsync } from '@utils/readFileAsync';

import 'react-datepicker/dist/react-datepicker.css';

const WritePage: React.FC = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [diveType, setDiveType] = useState<'FREE' | 'SCUBA'>('FREE');
  const [temperature, setTemperature] = useState('');
  const [maxDepth, setMaxDepth] = useState('');
  const [sight, setSight] = useState('');
  const [enterTime, setEnterTime] = useState<Date | null>(null);
  const [leaveTime, setLeaveTime] = useState<Date | null>(null);
  const [minOxygen, setMinOxygen] = useState('');
  const [maxOxygen, setMaxOxygen] = useState('');
  const [imageFileList, setImageFileList] = useState<File[]>([]);
  const [content, setContent] = useState('');
  const [position, setPosition] = useState({
    lat: 33.55635,
    lng: 126.795841,
  });
  const [location, setLocation] = useState('서울특별시');
  console.log(setLocation);

  const [imageFileUrlList, setImageFileUrlList] = useState<string[]>([]);
  const [isTempPostPromptModalOpen, setIsTempPostPromptModalOpen] =
    useState(false);
  const [isTempPostSnackbarOpen, setIsTempPostSnackbarOpen] = useState(false);

  const isLoading = useSelector((state) => state.postLog.isLoading);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { checkTempPost, loadTempPost, removeTempPost, createTempPost } =
    useTempPost();

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
    const tempPostExist = checkTempPost();
    if (tempPostExist) setIsTempPostPromptModalOpen(true);
  }, [checkTempPost]);

  const isValidated =
    temperature !== '' &&
    maxDepth !== '' &&
    sight !== '' &&
    minOxygen !== '' &&
    maxOxygen !== '' &&
    content !== '' &&
    enterTime !== null &&
    leaveTime !== null &&
    date !== null;

  const handleImageFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files === null) return;
    setImageFileList([...imageFileList, event.target.files[0]]);
    const imageFileUrl = await readFileAsync(event.target.files[0]);
    setImageFileUrlList((prev) => [...prev, imageFileUrl as string]);
    event.target.value = '';
  };

  const handleSubmit = async () => {
    if (date === null || enterTime === null || leaveTime === null) return;

    const postLogPayload = {
      date,
      diveType,
      enterTime,
      leaveTime,
      sight,
      maxDepth,
      temperature,
      maxOxygen,
      minOxygen,
      location,
      content,
      position,
      imageFileList,
    };

    try {
      await dispatch(postLog(postLogPayload));
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

  const handleTempSaveButtonClick = () => {
    createTempPost({
      diveType,
      date,
      leaveTime,
      enterTime,
      sight,
      maxDepth,
      temperature,
      maxOxygen,
      minOxygen,
      location,
      content,
      latitude: position.lat,
      longitude: position.lng,
    });
  };

  useEffect(() => {
    return () => {
      dispatch(postLogActions.clearState());
    };
  }, [dispatch]);

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
        <DatePicker startDate={date} onChange={(date) => setDate(date)} />
        <select
          onChange={(e) => setDiveType(e.target.value as 'FREE' | 'SCUBA')}
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
          <TimePicker
            startTime={enterTime}
            onChange={(time) => setEnterTime(time)}
          />
        </Flexbox>
        <Flexbox gap="1rem">
          <label>나온 시간</label>
          <TimePicker
            startTime={leaveTime}
            onChange={(time) => setLeaveTime(time)}
          />
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
        <FileInput
          onChange={() => {
            void handleImageFileChange;
          }}
        />
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
        <Button variant="text" onClick={() => navigate(-1)}>
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
