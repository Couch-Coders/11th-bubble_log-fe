import useTempPost from '@hooks/useTempPost';
import { theme } from '@lib/styles/theme';
import { DiveType } from '@lib/types/log';
import { useDispatch, useSelector } from '@store/index';
import { postLog, postLogActions } from '@store/slices/postLog';
import React, { useEffect, useState } from 'react';
import { MdCheck } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@components/common/Button';
import Card from '@components/common/Card';
import FileInput from '@components/common/FileInput';
import Flexbox from '@components/common/Flexbox';
import Input from '@components/common/Input';
import Snackbar from '@components/common/Snackbar';
import Textarea from '@components/common/Textarea';
import Title from '@components/common/Title';
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

const SubTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
`;

const SuccessIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  background-color: ${theme.success};
  color: white;
  border-radius: 50%;
`;

const WritePage: React.FC = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [diveType, setDiveType] = useState<DiveType>('FREE');
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
  const [isTempSaveSuccess, setIsTempSaveSuccess] = useState(false);

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
    console.log('handleImageFileChange');
    if (event.target.files === null) return;
    setImageFileList([...imageFileList, event.target.files[0]]);
    const imageFileUrl = await readFileAsync(event.target.files[0]);
    setImageFileUrlList((prev) => [...prev, imageFileUrl as string]);
    event.target.value = '';
    console.log('@imageFileUrl', imageFileUrl);
  };
  console.log('@imageFileUrlList', imageFileUrlList);

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

    setIsTempSaveSuccess(true);

    setTimeout(() => {
      setIsTempSaveSuccess(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      dispatch(postLogActions.clearState());
    };
  }, [dispatch]);

  return (
    <Layout>
      <Card margin="0 0 1rem 0">
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
          <Title>새 로그 생성</Title>
          {isLoading && 'loading...'}
          <SubTitle>필수 입력 항목</SubTitle>
          <DatePicker startDate={date} onChange={(date) => setDate(date)} />
          <select
            onChange={(e) => setDiveType(e.target.value as DiveType)}
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
            height="8rem"
            onChange={(e) => setContent(e.target.value)}
            placeholder="여기에 메모를 입력하세요."
          />
          <SubTitle>이미지 추가</SubTitle>
          <FileInput
            onChange={(event) => {
              void handleImageFileChange(event);
            }}
          />
          <ImagePreview
            imageFileUrlList={imageFileUrlList}
            onRemoveButtonClick={removeImageFileUrl}
          />
          <SubTitle>위치</SubTitle>
        </Flexbox>
        <KakaoMap position={position} setPosition={setPosition} />
        <Flexbox padding="1rem" width="100%" justify="between">
          <Button variant="text" onClick={() => navigate(-1)}>
            돌아가기
          </Button>
          <Flexbox gap="1rem">
            {isTempSaveSuccess && (
              <SuccessIcon>
                <MdCheck size="1.25rem" />
              </SuccessIcon>
            )}
            {!isTempSaveSuccess && (
              <Button variant="outlined" onClick={handleTempSaveButtonClick}>
                임시 저장
              </Button>
            )}
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
      </Card>
    </Layout>
  );
};

export default WritePage;
