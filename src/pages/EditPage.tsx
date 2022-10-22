import { logAPI } from '@lib/apis/log';
import { theme } from '@lib/styles/theme';
import { useSelector } from '@store/index';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '@components/common/Button';
import FileInput from '@components/common/FileInput';
import Flexbox from '@components/common/Flexbox';
import Input from '@components/common/Input';
import Textarea from '@components/common/Textarea';
import DatePicker from '@components/DatePicker';
import ImagePreview from '@components/ImagePreview';
import KakaoMap from '@components/KakaoMap';
import Layout from '@components/Layout';
import TimePicker from '@components/TimePicker';
import { BASE_URL, DIVE_TYPE } from '@utils/constants';

const EditPage: React.FC = () => {
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
  const [deletedImageFileList, setDeletedImageFileList] = useState<string[]>(
    [],
  );

  const [addedImageFileList, setAddedImageFileList] = useState<File[]>([]);

  console.log('@deletedImageFileList', deletedImageFileList);
  console.log('@addedImageFileList', addedImageFileList, setAddedImageFileList);

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
    setImageFileList([...imageFileList, event.target.files[0]]);
    loadImageFile(event.target.files[0], (e) => {
      setImageFileUrlList((prev) => [...prev, e.target?.result as string]);
    });

    event.target.value = '';
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
    if (
      data === null ||
      date === null ||
      enterTime === null ||
      leaveTime === null
    )
      return;
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

  const handleRemovePrieviewImageButtonClick = (
    imageFileUrl: string,
    imageFileIndex: number,
  ) => {
    removeImageFileUrlFromList(imageFileIndex);

    console.log('@imageFileUrl', imageFileUrl);

    // flag
    if (imageFileUrl.startsWith('https://')) {
      setDeletedImageFileList([...deletedImageFileList, imageFileUrl]);
    }
  };

  const removeImageFileUrlFromList = (imageFileIndex: number) => {
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
          로그 수정
        </h1>
        {isLoading && 'loading...'}
        <DatePicker startDate={date} onChange={(date) => setDate(date)} />
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
          <Input
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
          />
        </Flexbox>
        <Flexbox gap="1rem">
          <label>최고 깊이</label>
          <Input
            value={maxDepth}
            onChange={(e) => setMaxDepth(e.target.value)}
          />
        </Flexbox>
        <Flexbox gap="1rem">
          <label>시야</label>
          <Input value={sight} onChange={(e) => setSight(e.target.value)} />
        </Flexbox>
        <Flexbox gap="1rem">
          <label>들어간 시간</label>
          <TimePicker
            startTime={enterTime}
            onChange={(date) => setEnterTime(date)}
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
          />
        </Flexbox>
        <Flexbox gap="1rem">
          <label>나올 때 탱크량</label>
          <Input
            value={minOxygen}
            onChange={(e) => setMinOxygen(e.target.value)}
          />
        </Flexbox>

        <FileInput onChange={handleImageFileChange} />
        <Flexbox justify="start" gap="1rem" flexWrap>
          {imageFileUrlList.map((imageFileUrl, index) => (
            <ImagePreview
              key={index}
              imageFileUrl={imageFileUrl}
              imageFileIndex={index}
              onRemoveButtonClick={() =>
                handleRemovePrieviewImageButtonClick(imageFileUrl, index)
              }
            />
          ))}
        </Flexbox>
        <label>노트</label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Flexbox>
      <KakaoMap position={position} setPosition={setPosition} />
      <Flexbox padding="1rem" width="100%" justify="end">
        <Flexbox gap="1rem">
          <Button variant="text" onClick={() => navigate(-1)}>
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
