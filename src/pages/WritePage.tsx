import useTempPost from '@hooks/useTempPost';
import { gray } from '@lib/styles/palette';
import { theme } from '@lib/styles/theme';
import { DiveLocation, DiveType } from '@lib/types/log';
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
import Snackbar from '@components/common/Snackbar';
import Spacer from '@components/common/Spacer';
import Subtitle from '@components/common/Subtitle';
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
import { DIVE_LOCATION, DIVE_TYPE } from '@utils/constants';
import { readFileAsync } from '@utils/readFileAsync';

import 'react-datepicker/dist/react-datepicker.css';

const SuccessIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 86.34px;
  height: 2.5rem;
  background-color: ${theme.success};
  color: white;
  border-radius: 0.5rem;
`;

const InputLabel = styled.label`
  color: ${gray[500]};
  font-size: 0.875rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
  row-gap: 2rem;
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
  const [location, setLocation] = useState<DiveLocation>('서울특별시');
  const [imageFileUrlList, setImageFileUrlList] = useState<string[]>([]);
  const [isTempPostPromptModalOpen, setIsTempPostPromptModalOpen] =
    useState(false);
  const [isTempPostSnackbarOpen, setIsTempPostSnackbarOpen] = useState(false);
  const [isTempSaveSuccess, setIsTempSaveSuccess] = useState(false);

  const isMaxOxygenInputValid =
    maxOxygen === '' || (Number(maxOxygen) >= 0 && Number(maxOxygen) <= 30);
  const isMinOxygenInputValid =
    minOxygen === '' || (Number(minOxygen) >= 0 && Number(minOxygen) <= 30);
  const isTemperatureInputValid =
    temperature === '' ||
    (Number(temperature) >= 0 && Number(temperature) <= 30);
  const isMaxDepthInputValid =
    maxDepth === '' || (Number(maxDepth) >= 0 && Number(maxDepth) <= 30);
  const isSightInputValid =
    sight === '' || (Number(sight) >= 0 && Number(sight) <= 30);

  const isLoading = useSelector((state) => state.postLog.isLoading);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { checkTempPost, loadTempPost, removeTempPost, createTempPost } =
    useTempPost();

  const handleMaxOxygenInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setMaxOxygen(event.target.value.replace(/\D/g, ''));
  };

  const handleMinOxygenInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setMinOxygen(event.target.value.replace(/\D/g, ''));
  };

  const handleTemperatureInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTemperature(event.target.value.replace(/\D/g, ''));
  };

  const handleMaxDepthInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setMaxDepth(event.target.value.replace(/\D/g, ''));
  };

  const handleSightInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSight(event.target.value.replace(/\D/g, ''));
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
    const tempPostExist = checkTempPost();
    if (tempPostExist) setIsTempPostPromptModalOpen(true);
  }, [checkTempPost]);

  const isFormValidated =
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
          <Subtitle>필수 입력 항목</Subtitle>
          <DatePicker startDate={date} onChange={(date) => setDate(date)} />
          <GridContainer>
            <Flexbox flex="col" items="start" gap="0.5rem">
              <InputLabel>다이브 종류</InputLabel>
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
            </Flexbox>
            <Flexbox flex="col" items="start" gap="0.5rem">
              <InputLabel>장소</InputLabel>
              <select
                onChange={(e) => setLocation(e.target.value as DiveLocation)}
                defaultValue="type"
              >
                <option value="type" disabled>
                  장소
                </option>
                {DIVE_LOCATION.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
              </select>
            </Flexbox>
            <Flexbox flex="col" items="start" gap="0.5rem">
              <InputLabel>들어간 시간</InputLabel>
              <TimePicker
                startTime={enterTime}
                onChange={(time) => setEnterTime(time)}
              />
            </Flexbox>
            <Flexbox flex="col" items="start" gap="0.5rem">
              <InputLabel>나온 시간</InputLabel>
              <TimePicker
                startTime={leaveTime}
                onChange={(time) => setLeaveTime(time)}
              />
            </Flexbox>
            <Flexbox flex="col" items="start" gap="0.5rem">
              <InputLabel>들어갈 때 탱크량</InputLabel>
              <MeasureInput
                value={maxOxygen}
                measure="L"
                onChange={handleMaxOxygenInputChange}
                placeholder="0~100L 사이"
                isValid={isMaxOxygenInputValid}
                errorMessage="0~100 사이의 값을 입력해주세요."
              />
            </Flexbox>
            <Flexbox flex="col" items="start" gap="0.5rem">
              <InputLabel>나올 때 탱크량</InputLabel>
              <MeasureInput
                value={minOxygen}
                measure="L"
                onChange={handleMinOxygenInputChange}
                placeholder="0~100L 사이"
                isValid={isMinOxygenInputValid}
                errorMessage="0~100 사이의 값을 입력해주세요."
              />
            </Flexbox>
            <Flexbox flex="col" items="start" gap="0.5rem">
              <InputLabel>수온</InputLabel>
              <MeasureInput
                value={temperature}
                measure="°"
                onChange={handleTemperatureInputChange}
                placeholder="0~30°C 사이"
                isValid={isTemperatureInputValid}
                errorMessage="0~30 사이의 값을 입력해주세요."
              />
            </Flexbox>
            <Flexbox flex="col" items="start" gap="0.5rem">
              <InputLabel>최고 깊이</InputLabel>
              <MeasureInput
                value={maxDepth}
                measure="m"
                onChange={handleMaxDepthInputChange}
                placeholder="0~100m 사이"
                isValid={isMaxDepthInputValid}
                errorMessage="0~100 사이의 값을 입력해주세요."
              />
            </Flexbox>
            <Flexbox flex="col" items="start" gap="0.5rem">
              <InputLabel>시야</InputLabel>
              <MeasureInput
                value={sight}
                measure="m"
                onChange={handleSightInputChange}
                placeholder="0~100m 사이"
                isValid={isSightInputValid}
                errorMessage="0~100 사이의 값을 입력해주세요."
              />
            </Flexbox>
          </GridContainer>
          <Spacer />
          <Subtitle>메모</Subtitle>
          <Textarea
            value={content}
            height="8rem"
            onChange={(e) => setContent(e.target.value)}
            placeholder="여기에 메모를 입력하세요."
          />
          <Spacer />
          <Subtitle>이미지 추가</Subtitle>
          <FileInput
            onChange={(event) => {
              void handleImageFileChange(event);
            }}
          />
          <ImagePreview
            imageFileUrlList={imageFileUrlList}
            onRemoveButtonClick={removeImageFileUrl}
          />
          <Spacer />
          <Subtitle>위치</Subtitle>
        </Flexbox>
        <KakaoMap position={position} setPosition={setPosition} />
        <Flexbox padding="1rem" width="100%" justify="between">
          <Button variant="text" onClick={() => navigate(-1)}>
            돌아가기
          </Button>
          <Flexbox gap="1rem">
            {isTempSaveSuccess && (
              <SuccessIcon>
                <Flexbox gap="0.25rem">
                  <MdCheck size="1.25rem" />
                  <p style={{ fontSize: '0.875rem' }}>저장됨</p>
                </Flexbox>
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
              disabled={!isFormValidated}
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
