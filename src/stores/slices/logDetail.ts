import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  PayloadAction,
  AnyAction,
} from '@reduxjs/toolkit';
import { GetLogDetailResponse } from 'types/log';

import { getLogDetailAPI } from '@apis/log';

export const fetchLogDetail = createAsyncThunk<GetLogDetailResponse, string>(
  'logDetail/fetchStatus',
  async (logId: string) => await getLogDetailAPI(logId),
);

interface LogState {
  data: GetLogDetailResponse | null;
  isLoading: boolean;
  error: SerializedError | null;
}

const initialState: LogState = {
  data: null,
  isLoading: false,
  error: null,
};

export const logDetailSlice = createSlice({
  name: 'logDetail',
  initialState,
  reducers: {
    clearData(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchLogDetail.fulfilled,
        (state, action: PayloadAction<GetLogDetailResponse>) => {
          state.isLoading = false;
          state.data = action.payload;
          state.error = null;
        },
      )
      .addCase(fetchLogDetail.rejected, (state, action: AnyAction) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const logDetailActions = { ...logDetailSlice.actions };

export default logDetailSlice;
