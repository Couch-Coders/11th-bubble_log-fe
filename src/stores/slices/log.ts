import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  PayloadAction,
} from '@reduxjs/toolkit';
import { GetLogsQuery, GetLogsResponse, LogResponse } from 'types/log';

import { getLogsAPI } from '@apis/log';

export const fetchLogs = createAsyncThunk<GetLogsResponse, GetLogsQuery>(
  'log/get/fetchStatus',
  async (query: GetLogsQuery) => await getLogsAPI(query),
);

export const fetchLogsMore = createAsyncThunk<GetLogsResponse, GetLogsQuery>(
  'log/get/more/fetchStatus',
  async (query: GetLogsQuery) => await getLogsAPI(query),
);

interface LogState {
  data: LogResponse[];
  isLoading: boolean;
  error: SerializedError | null;
  query: GetLogsQuery;
}

const initialState: LogState = {
  data: [],
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
    setQueryKeyword: (state, action: PayloadAction<string>) => {
      state.query.keyword = action.payload;
    },
    setQueryType: (state, action: PayloadAction<string>) => {
      state.query.diveType = action.payload;
    },
    setQueryLocation: (state, action: PayloadAction<string>) => {
      state.query.location = action.payload;
    },
    setQueryTemperature: (state, action: PayloadAction<string>) => {
      const temperatureString = action.payload;

      const minTemperature = temperatureString.split('-')[0];
      const maxTemperature = temperatureString.split('-')[1];

      state.query.minTemperature = minTemperature;
      state.query.maxTemperature = maxTemperature;
    },
    setQueryDepth: (state, action: PayloadAction<string>) => {
      const depthString = action.payload;

      const minDepth = depthString.split('-')[0];
      const maxDepth = depthString.split('-')[1];

      state.query.minDepth = minDepth;
      state.query.maxDepth = maxDepth;
    },
    clearData: (state) => {
      state.data = [];
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
        state.data = action.payload.content;
        state.query.page = String(Number(state.query.page) + 1);
        state.error = null;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
    builder
      .addCase(fetchLogsMore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLogsMore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(...action.payload.content);
        state.query.page = String(Number(state.query.page) + 1);
        state.error = null;
      })
      .addCase(fetchLogsMore.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const logActions = { ...logSlice.actions };

export default logSlice;
