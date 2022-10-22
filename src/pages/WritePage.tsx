import useTempPost from '@hooks/useTempPost';
import { theme } from '@lib/styles/theme';
import { useDispatch, useSelector } from '@store/index';
import { createLog, logCreateActions } from '@store/slices/logCreate';
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
  const [imageFileUrlList, setImageFileUrlList] = useState<string[]>([]);
  const [isTempPostPromptModalOpen, setIsTempPostPromptModalOpen] =
    useState(false);
  const [isTempPostSnackbarOpen, setIsTempPostSnackbarOpen] = useState(false);

  const {
    isLoading,
    date,
    enterTime,
    leaveTime,
    diveType,
    sight,
    temperature,
    maxDepth,
    minOxygen,
    maxOxygen,
    content,
    latitude,
    longitude,
    location,
    imageFileList,
  } = useSelector((state) => state.logCreate);

  const {
    setDate,
    setDiveType,
    setTemperature,
    setContent,
    setMinOxygen,
    setMaxOxygen,
    setMaxDepth,
    setSight,
    setEnterTime,
    setLeaveTime,
    setLatitude,
    setLongitude,
    clearState,
  } = logCreateActions;

  const position = {
    lat: latitude,
    lng: longitude,
  };

  const setPosition = (event: kakao.maps.event.MouseEvent) => {
    dispatch(setLatitude(event.latLng.getLat()));
    dispatch(setLongitude(event.latLng.getLng()));
  };

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
    dispatch(logCreateActions.addImageFileToList(event.target.files[0]));
    const imageFileUrl = await readFileAsync(event.target.files[0]);
    setImageFileUrlList((prev) => [...prev, imageFileUrl as string]);
    event.target.value = '';
  };

  const handleSubmit = async () => {
    if (date === null || enterTime === null || leaveTime === null) return;

    const createLogBody = {
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
      longitude,
      latitude,
      imageFileList,
    };

    try {
      await dispatch(createLog(createLogBody));
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
      location,
      content,
      longitude,
      latitude,
    };

    createTempPost(tempPostData);
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch, clearState]);

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
        <DatePicker
          startDate={date}
          onChange={(date) => dispatch(setDate(date))}
        />
        <select
          onChange={(e) =>
            dispatch(setDiveType(e.target.value as 'FREE' | 'SCUBA'))
          }
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
            onChange={(e) => dispatch(setTemperature(e.target.value))}
            placeholder="수온을 입력하세요."
          />
        </Flexbox>
        <Flexbox gap="1rem">
          <label>최고 깊이</label>
          <MeasureInput
            value={maxDepth}
            measure="m"
            onChange={(e) => dispatch(setMaxDepth(e.target.value))}
            placeholder="최고 깊이를 입력하세요."
          />
        </Flexbox>
        <Flexbox gap="1rem">
          <label>시야</label>
          <Input
            value={sight}
            onChange={(e) => dispatch(setSight(e.target.value))}
            placeholder="시야를 입력하세요."
          />
        </Flexbox>
        <Flexbox gap="1rem">
          <label>들어간 시간</label>
          <TimePicker
            startTime={enterTime}
            onChange={(time) => dispatch(setEnterTime(time))}
          />
        </Flexbox>
        <Flexbox gap="1rem">
          <label>나온 시간</label>
          <TimePicker
            startTime={leaveTime}
            onChange={(time) => dispatch(setLeaveTime(time))}
          />
        </Flexbox>
        <Flexbox gap="1rem">
          <label>들어갈 때 탱크량</label>
          <Input
            value={maxOxygen}
            onChange={(e) => dispatch(setMaxOxygen(e.target.value))}
            placeholder="들어갈 때 탱크량을 입력하세요."
          />
        </Flexbox>
        <Flexbox gap="1rem">
          <label>나올 때 탱크량</label>
          <Input
            value={minOxygen}
            onChange={(e) => dispatch(setMinOxygen(e.target.value))}
            placeholder="나올 때 탱크량을 입력하세요."
          />
        </Flexbox>
        <label>메모</label>
        <Textarea
          value={content}
          onChange={(e) => dispatch(setContent(e.target.value))}
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
