import { logAPI } from '@lib/apis/log';
import { GetLogsQuery, GetLogsResponse, LogResponse } from '@lib/types/log';
import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  PayloadAction,
} from '@reduxjs/toolkit';

import { filterQueryObject } from '@utils/filterQueryObject';

export const fetchLogs = createAsyncThunk<GetLogsResponse, void>(
  'log/get/fetchStatus',
  async (_, thunkAPI: any) => {
    const state = thunkAPI.getState();
    const query = state.log.query;

    return await logAPI.getLogs(filterQueryObject(query));
  },
);

export const fetchMoreLogs = createAsyncThunk<GetLogsResponse, void>(
  'log/get/fetchMoreStatus',
  async (_, thunkAPI: any) => {
    const state = thunkAPI.getState();
    const query = state.log.query;

    return await logAPI.getLogs(filterQueryObject(query));
  },
);

interface LogState {
  response: GetLogsResponse | null;
  data: LogResponse[];
  isLoading: boolean;
  error: SerializedError | null;
  query: GetLogsQuery;
}

const initialState: LogState = {
  response: null,
  data: [],
  isLoading: true,
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
    sort: '',
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
    setQuerySort: (state, action: PayloadAction<string>) => {
      state.query.sort = action.payload;
    },
    setQueryPage: (state, action: PayloadAction<string>) => {
      state.query.page = action.payload;
    },
    clearState: (state) => {
      state.response = null;
      state.data = [];
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
        sort: 'id,desc',
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
        state.response = action.payload;
        state.data = action.payload.content;
        state.error = null;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });

    builder
      .addCase(fetchMoreLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMoreLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload;
        state.data.push(...action.payload.content);
        state.error = null;
      })
      .addCase(fetchMoreLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const logActions = { ...logSlice.actions };

export default logSlice;
