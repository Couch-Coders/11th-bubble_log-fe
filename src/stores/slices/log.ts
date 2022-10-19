import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  PayloadAction,
} from '@reduxjs/toolkit';
import { GetLogsQuery, GetLogsResponse, LogResponse } from 'types/log';

import { logAPI } from '@apis/log';
import { filterQueryObject } from '@utils/filterQueryObject';

export const fetchLogs = createAsyncThunk<GetLogsResponse, GetLogsQuery>(
  'log/get/fetchStatus',
  async (query) => await logAPI.getLogs(filterQueryObject(query)),
);
interface LogState {
  data: GetLogsResponse | null;
  logList: LogResponse[];
  isLoading: boolean;
  error: SerializedError | null;
  query: GetLogsQuery;
}

const initialState: LogState = {
  data: null,
  logList: [],
  isLoading: false,
  error: null,
  query: {
    startDate: '',
    endDate: '',
    diveType: '',
    location: '',
    minDepth: '',
    maxDepth: '',
    minTemperature: '',
    maxTemperature: '',
    keyword: '',
    page: '0',
    size: '',
    orderBy: '',
  },
};

export const logSlice = createSlice({
  name: 'log',
  initialState,
  reducers: {
    setQueryStartDate: (state, action: PayloadAction<string>) => {
      state.query.startDate = action.payload;
    },
    setQueryEndDate: (state, action: PayloadAction<string>) => {
      state.query.endDate = action.payload;
    },
    setQueryKeyword: (state, action: PayloadAction<string>) => {
      state.query.keyword = action.payload;
    },
    setQueryDiveType: (state, action: PayloadAction<string>) => {
      state.query.diveType = action.payload;
    },
    setQueryLocation: (state, action: PayloadAction<string>) => {
      state.query.location = action.payload;
    },
    setQueryMinTemperature: (state, action: PayloadAction<string>) => {
      state.query.minTemperature = action.payload;
    },
    setQueryMaxTemperature: (state, action: PayloadAction<string>) => {
      state.query.maxTemperature = action.payload;
    },
    setQueryMinDepth: (state, action: PayloadAction<string>) => {
      state.query.minDepth = action.payload;
    },
    setQueryMaxDepth: (state, action: PayloadAction<string>) => {
      state.query.maxDepth = action.payload;
    },
    setQueryOrderBy: (state, action: PayloadAction<string>) => {
      state.query.orderBy = action.payload;
    },
    setQueryPage: (state, action: PayloadAction<string>) => {
      state.query.page = action.payload;
    },
    clearState: (state) => {
      state.data = null;
      state.logList = [];
      state.isLoading = false;
      state.error = null;
      state.query = {
        startDate: '',
        endDate: '',
        diveType: '',
        location: '',
        minDepth: '',
        maxDepth: '',
        minTemperature: '',
        maxTemperature: '',
        keyword: '',
        page: '0',
        size: '',
        orderBy: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.logList.push(...action.payload.content);
        state.error = null;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const logActions = { ...logSlice.actions };

export default logSlice;
