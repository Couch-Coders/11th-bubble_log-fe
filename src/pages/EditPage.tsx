import { logAPI } from '@lib/apis/log';
import { gray } from '@lib/styles/palette';
import { DiveLocation, DiveType } from '@lib/types/log';
import { useDispatch, useSelector } from '@store/index';
import { postLogActions } from '@store/slices/postLog';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@components/common/Button';
import Card from '@components/common/Card';
import Dropdown from '@components/common/dropdown';
import FileInput from '@components/common/FileInput';
import Flexbox from '@components/common/Flexbox';
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
import TimePicker from '@components/TimePicker';
import { DIVE_LOCATION, DIVE_TYPE } from '@utils/constants';
import { readFileAsync } from '@utils/readFileAsync';

import 'react-datepicker/dist/react-datepicker.css';

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
  const [date, setDate] = useState<Date | null>(new Date());
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
  const [location, setLocation] = useState<DiveLocation>('???????????????');
  const [imageFileUrlList, setImageFileUrlList] = useState<string[]>([]);

  const [deletedImageFileList, setDeletedImageFileList] = useState<string[]>(
    [],
  );
  const [addedImageFileList, setAddedImageFileList] = useState<File[]>([]);

  console.log(setDeletedImageFileList);
  console.log(setAddedImageFileList);

  const { data } = useSelector((state) => state.logDetail);

  const isMaxOxygenInputValid =
    maxOxygen === '' || (Number(maxOxygen) >= 0 && Number(maxOxygen) <= 100);
  const isMinOxygenInputValid =
    minOxygen === '' || (Number(minOxygen) >= 0 && Number(minOxygen) <= 100);
  const isTemperatureInputValid =
    temperature === '' ||
    (Number(temperature) >= 0 && Number(temperature) <= 30);
  const isMaxDepthInputValid =
    maxDepth === '' || (Number(maxDepth) >= 0 && Number(maxDepth) <= 100);
  const isSightInputValid =
    sight === '' || (Number(sight) >= 0 && Number(sight) <= 100);

  const isLoading = useSelector((state) => state.postLog.isLoading);

  const dispatch = useDispatch();

  const params = useParams();
  const logId = params.id as string;

  const navigate = useNavigate();

  const addLogImages = async () => {
    const formData = new FormData();
    addedImageFileList.forEach((imageFile) => {
      formData.append('images', imageFile);
    });

    try {
      const response = await logAPI.createLogImages(formData, logId);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLogImages = async () => {
    deletedImageFileList.map(async (imageFile) => {
      try {
        const response = await logAPI.deleteLogImage(logId, imageFile);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    });
  };

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

  const isFormValidated =
    temperature !== '' &&
    maxDepth !== '' &&
    sight !== '' &&
    minOxygen !== '' &&
    maxOxygen !== '' &&
    content !== '' &&
    enterTime !== null &&
    leaveTime !== null &&
    date !== null &&
    isMaxDepthInputValid &&
    isMaxOxygenInputValid &&
    isMinOxygenInputValid &&
    isSightInputValid &&
    isTemperatureInputValid;

  const handleImageFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files === null) return;
    setImageFileList([...imageFileList, event.target.files[0]]);
    const imageFileUrl = await readFileAsync(event.target.files[0]);
    setImageFileUrlList((prev) => [...prev, imageFileUrl as string]);
    event.target.value = '';
  };

  const removeImageFileUrl = (imageFileIndex: number) => {
    setImageFileUrlList((imageFileUrlList) =>
      imageFileUrlList.filter((_, index) => imageFileIndex !== index),
    );
  };

  const handleSubmit = async () => {
    if (
      data === null ||
      date === null ||
      enterTime === null ||
      leaveTime === null
    )
      return;

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
      location: '???????????????',
      content,
      longitude: position.lng,
      latitude: position.lat,
    };

    try {
      const updateLogResponse = await logAPI.updateLog(body, String(data.id));
      console.log(updateLogResponse);

      if (deletedImageFileList.length !== 0) await deleteLogImages();
      if (addedImageFileList.length !== 0) await addLogImages();

      navigate(`/log/${logId}`);
    } catch (error) {
      console.log(error);
    }
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
        <Flexbox padding="1rem" flex="col" items="start" gap="1rem">
          <Title>?????? ????????????</Title>
          {isLoading && 'loading...'}
          <Subtitle>?????? ?????? ??????</Subtitle>
          <DatePicker startDate={date} onChange={(date) => setDate(date)} />
          <GridContainer>
            <Flexbox flex="col" items="start" gap="0.5rem">
              <InputLabel>????????? ??????</InputLabel>
              <Dropdown.Button label={diveType}>
                <Dropdown.Menu>
                  {DIVE_TYPE.map((option, index) => (
                    <Dropdown.MenuItem
                      key={index}
                      label={option}
                      onClick={() => setDiveType(option as DiveType)}
                    />
                  ))}
                </Dropdown.Menu>
              </Dropdown.Button>
            </Flexbox>
            <Flexbox flex="col" items="start" gap="0.5rem">
              <InputLabel>??????</InputLabel>
              <Dropdown.Button label={location}>
                <Dropdown.Menu>
                  {DIVE_LOCATION.map((option, index) => (
                    <Dropdown.MenuItem
                      key={index}
                      label={option}
                      onClick={() => setLocation(option as DiveLocation)}
                    />
                  ))}
                </Dropdown.Menu>
              </Dropdown.Button>
            </Flexbox>
            <Flexbox flex="col" items="start" gap="0.5rem">
              <InputLabel>????????? ??????</InputLabel>
              <TimePicker
                startTime={enterTime}
                onChange={(time) => setEnterTime(time)}
              />
            </Flexbox>
            <Flexbox flex="col" items="start" gap="0.5rem">
              <InputLabel>?????? ??????</InputLabel>
              <TimePicker
                startTime={leaveTime}
                onChange={(time) => setLeaveTime(time)}
              />
            </Flexbox>
            <Flexbox flex="col" items="start" gap="0.5rem">
              <InputLabel>????????? ??? ?????????</InputLabel>
              <MeasureInput
                value={maxOxygen}
                measure="L"
                onChange={handleMaxOxygenInputChange}
                placeholder="0~100L ??????"
                isValid={isMaxOxygenInputValid}
                errorMessage="0~100 ????????? ?????? ??????????????????."
              />
            </Flexbox>
            <Flexbox flex="col" items="start" gap="0.5rem">
              <InputLabel>?????? ??? ?????????</InputLabel>
              <MeasureInput
                value={minOxygen}
                measure="L"
                onChange={handleMinOxygenInputChange}
                placeholder="0~100L ??????"
                isValid={isMinOxygenInputValid}
                errorMessage="0~100 ????????? ?????? ??????????????????."
              />
            </Flexbox>
            <Flexbox flex="col" items="start" gap="0.5rem">
              <InputLabel>??????</InputLabel>
              <MeasureInput
                value={temperature}
                measure="??"
                onChange={handleTemperatureInputChange}
                placeholder="0~30??C ??????"
                isValid={isTemperatureInputValid}
                errorMessage="0~30 ????????? ?????? ??????????????????."
              />
            </Flexbox>
            <Flexbox flex="col" items="start" gap="0.5rem">
              <InputLabel>?????? ??????</InputLabel>
              <MeasureInput
                value={maxDepth}
                measure="m"
                onChange={handleMaxDepthInputChange}
                placeholder="0~100m ??????"
                isValid={isMaxDepthInputValid}
                errorMessage="0~100 ????????? ?????? ??????????????????."
              />
            </Flexbox>
            <Flexbox flex="col" items="start" gap="0.5rem">
              <InputLabel>??????</InputLabel>
              <MeasureInput
                value={sight}
                measure="m"
                onChange={handleSightInputChange}
                placeholder="0~100m ??????"
                isValid={isSightInputValid}
                errorMessage="0~100 ????????? ?????? ??????????????????."
              />
            </Flexbox>
          </GridContainer>
          <Spacer />
          <Subtitle>??????</Subtitle>
          <Textarea
            value={content}
            height="8rem"
            onChange={(e) => setContent(e.target.value)}
            placeholder="????????? ????????? ???????????????."
          />
          <Spacer />
          <Subtitle>????????? ??????</Subtitle>
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
          <Subtitle>??????</Subtitle>
        </Flexbox>
        <KakaoMap position={position} setPosition={setPosition} />
        <Flexbox padding="1rem" width="100%" justify="between">
          <Button variant="text" onClick={() => navigate(-1)}>
            ????????????
          </Button>
          <Button
            onClick={() => {
              void handleSubmit();
            }}
            disabled={!isFormValidated}
          >
            ????????????
          </Button>
        </Flexbox>
      </Card>
    </Layout>
  );
};

export default WritePage;
