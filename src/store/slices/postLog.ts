import { logAPI } from '@lib/apis/log';
import { DiveType } from '@lib/types/log';
import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  PayloadAction,
} from '@reduxjs/toolkit';

export const postLog = createAsyncThunk(
  'log/post/status',
  async (payload: {
    date: Date;
    diveType: DiveType;
    enterTime: Date;
    leaveTime: Date;
    sight: string;
    maxDepth: string;
    temperature: string;
    maxOxygen: string;
    minOxygen: string;
    location: string;
    content: string;
    position: {
      lat: number;
      lng: number;
    };
    imageFileList: File[];
  }) => {
    const {
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
    } = payload;
    const postLogBody = {
      date: date.toISOString().slice(0, -1),
      diveType,
      enterTime: enterTime.toISOString().slice(0, -1),
      leaveTime: leaveTime.toISOString().slice(0, -1),
      sight: Number(sight),
      maxDepth: Number(maxDepth),
      temperature: Number(temperature),
      maxOxygen: Number(maxOxygen),
      minOxygen: Number(minOxygen),
      location,
      content,
      latitude: position.lat,
      longitude: position.lng,
    };

    const createLogResponse = await logAPI.createLog(postLogBody);

    if (imageFileList.length === 0) return;

    const formData = new FormData();

    imageFileList.forEach((imageFile) => {
      formData.append('images', imageFile);
    });

    await logAPI.createLogImages(formData, String(createLogResponse.id));
  },
);
interface LogPostState {
  isLoading: boolean;
  error: SerializedError | null;
  date: Date | null;
  enterTime: Date | null;
  leaveTime: Date | null;
  diveType: 'FREE' | 'SCUBA';
  sight: string;
  temperature: string;
  maxDepth: string;
  minOxygen: string;
  maxOxygen: string;
  content: string;
  latitude: number;
  longitude: number;
  location: string;
  imageFileList: File[];
}

const initialState: LogPostState = {
  isLoading: false,
  error: null,
  date: null,
  enterTime: null,
  leaveTime: null,
  diveType: 'FREE',
  sight: '',
  temperature: '',
  maxDepth: '',
  minOxygen: '',
  maxOxygen: '',
  content: '',
  latitude: 33.55635,
  longitude: 126.795841,
  location: '',
  imageFileList: [],
};

export const postLogSlice = createSlice({
  name: 'postLog',
  initialState,
  reducers: {
    setDate(state, action: PayloadAction<Date | null>) {
      state.date = action.payload;
    },
    setEnterTime(state, action: PayloadAction<Date | null>) {
      state.enterTime = action.payload;
    },
    setLeaveTime(state, action: PayloadAction<Date | null>) {
      state.leaveTime = action.payload;
    },
    setDiveType(state, action: PayloadAction<DiveType>) {
      state.diveType = action.payload;
    },
    setSight(state, action: PayloadAction<string>) {
      state.sight = action.payload;
    },
    setTemperature(state, action: PayloadAction<string>) {
      state.temperature = action.payload;
    },
    setMaxDepth(state, action: PayloadAction<string>) {
      state.maxDepth = action.payload;
    },
    setMinOxygen(state, action: PayloadAction<string>) {
      state.minOxygen = action.payload;
    },
    setMaxOxygen(state, action: PayloadAction<string>) {
      state.maxOxygen = action.payload;
    },
    setContent(state, action: PayloadAction<string>) {
      state.content = action.payload;
    },
    setLatitude(state, action: PayloadAction<number>) {
      state.latitude = action.payload;
    },
    setLongitude(state, action: PayloadAction<number>) {
      state.longitude = action.payload;
    },
    setLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
    },
    addImageFileToList(state, action: PayloadAction<File>) {
      state.imageFileList.push(action.payload);
    },
    clearState(state) {
      state.isLoading = false;
      state.error = null;
      state.date = null;
      state.enterTime = null;
      state.leaveTime = null;
      state.diveType = 'FREE';
      state.sight = '';
      state.temperature = '';
      state.maxDepth = '';
      state.minOxygen = '';
      state.maxOxygen = '';
      state.content = '';
      state.latitude = 33.55635;
      state.longitude = 126.795841;
      state.location = '';
      state.imageFileList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postLog.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(postLog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const postLogActions = { ...postLogSlice.actions };

export default postLogSlice;
