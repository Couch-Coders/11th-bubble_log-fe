import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  PayloadAction,
  AnyAction,
} from '@reduxjs/toolkit';
import { GetLogDetailResponse } from 'types/log';

import { getLogDetailAPI } from '@apis/log';

export const fetchLogDetail = createAsyncThunk<GetLogDetailResponse, number>(
  'logDetail/fetchStatus',
  async (logId: number) => await getLogDetailAPI(logId),
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
    setIsFavorite(state, action: PayloadAction<boolean>) {
      if (state.data !== null) state.data.isFavorite = action.payload;
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
