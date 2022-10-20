import { logAPI } from '@lib/apis/log';
import { useSelector } from '@store/index';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '@components/common/Button';
import FileInput from '@components/common/FileInput';
import Flexbox from '@components/common/Flexbox';
import Input from '@components/common/Input';
import Textarea from '@components/common/Textarea';
import ImagePreview from '@components/ImagePreview';
import KakaoMap from '@components/KakaoMap';
import Layout from '@components/Layout';
import { BASE_URL, DIVE_TYPE } from '@utils/constants';

const EditPage: React.FC = () => {
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

  const [deletedImageFileList, setDeletedImageFileList] = useState<string[]>(
    [],
  );
  const [addedImageFileList, setAddedImageFileList] = useState<File[]>([]);

  console.log(
    deletedImageFileList,
    setDeletedImageFileList,
    addedImageFileList,
    setAddedImageFileList,
  );

  const isValidated =
    diveType !== '' &&
    temperature !== '' &&
    maxDepth !== '' &&
    sight !== '' &&
    minOxygen !== '' &&
    maxOxygen !== '' &&
    content !== '';

  const navigate = useNavigate();

  const params = useParams();
  const logId = params.id as string;

  const { data } = useSelector((state) => state.logDetail);

  useEffect(() => {
    if (data === null) return;
    setDate(new Date(data.date));
    setDiveType(data.diveType);
    setTemperature(String(data.temperature));
    setMaxDepth(String(data.maxDepth));
    setSight(String(data.sight));
    setEnterTime(new Date(data.enterTime));
    setLeaveTime(new Date(data.leaveTime));
    setMinOxygen(String(data.minOxygen));
    setMaxOxygen(String(data.maxOxygen));
    setContent(data.content);

    setPosition({
      lat: data.latitude,
      lng: data.longitude,
    });
    setImageFileUrlList(data.images.map((image) => `${BASE_URL}${image}`));
  }, [data]);

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
    if (event.target.files === null) return;
    // (prev => [...prev, event.target.files[0]]) causes nullable issue
    setImageFileList([...imageFileList, event.target.files[0]]);
    setImageFile(event.target.files[0]);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setContent(event.target.value);
  };

  const handleCancelButtonClick = () => {
    navigate(-1);
  };

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

  const handleSubmit = async () => {
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
      location: '서울특별시',
      content,
      longitude: position.lng,
      latitude: position.lat,
    };
    console.log('@body', body);

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
    if (imageFile === null) return;

    const fileReader = new FileReader();

    // event.target possibly null?
    fileReader.onload = (event) => {
      setImageFileUrlList((prev) => [...prev, event.target?.result as string]);
    };

    fileReader.readAsDataURL(imageFile);
  }, [imageFile]);

  const removeImageFileUrl = (imageFileIndex: number) => {
    setImageFileUrlList((imageFileUrlList) =>
      imageFileUrlList.filter((_, index) => imageFileIndex !== index),
    );
  };

  return (
    <Layout>
      <Flexbox padding="1rem" flex="col" items="start" gap="1rem">
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
        <Flexbox gap="1rem">
          <label>수온</label>
          <Input value={temperature} onChange={handleTemperatureChange} />
        </Flexbox>
        <Flexbox gap="1rem">
          <label>최고 깊이</label>
          <Input value={maxDepth} onChange={handleMaxDepthChange} />
        </Flexbox>
        <Flexbox gap="1rem">
          <label>시야</label>
          <Input value={sight} onChange={handleSightChange} />
        </Flexbox>
        <Flexbox gap="1rem">
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
        </Flexbox>
        <Flexbox gap="1rem">
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
        </Flexbox>
        <Flexbox gap="1rem">
          <label>들어갈 때 탱크량</label>
          <Input value={maxOxygen} onChange={handleMaxOxygenChange} />
        </Flexbox>
        <Flexbox gap="1rem">
          <label>나올 때 탱크량</label>
          <Input value={minOxygen} onChange={handleMinOxygenChange} />
        </Flexbox>

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
        <label>노트</label>
        <Textarea value={content} onChange={handleDescriptionChange} />
      </Flexbox>
      <KakaoMap position={position} setPosition={setPosition} />
      <Flexbox padding="1rem" width="100%" justify="end">
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
            수정하기
          </Button>
        </Flexbox>
      </Flexbox>
    </Layout>
  );
};

export default EditPage;
