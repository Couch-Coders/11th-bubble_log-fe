import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  PayloadAction
} from '@reduxjs/toolkit'
import { GetLogsQuery, GetLogsResponse, LogWithId } from 'types/log'

import { getLogsAPI } from '@apis/log'

export const fetchLogs = createAsyncThunk<GetLogsResponse, GetLogsQuery>(
  'log/fetchStatus',
  async (query: GetLogsQuery) => await getLogsAPI(query)
)

interface LogState {
  data: LogWithId[]
  isLoading: boolean
  error: SerializedError | null
  query: GetLogsQuery
}

const initialState: LogState = {
  data: [],
  isLoading: false,
  error: null,
  query: {
    date: '',
    type: '',
    location: '',
    depth: '',
    temperature: '',
    favorite: '',
    keyword: '',
    page: '',
    size: '',
    orderBy: ''
  }
}

export const logSlice = createSlice({
  name: 'log',
  initialState,
  reducers: {
    setQueryKeyword: (state, action: PayloadAction<string>) => {
      state.query.keyword = action.payload
    },
    setQueryType: (state, action: PayloadAction<string>) => {
      state.query.type = action.payload
    },
    setQueryLocation: (state, action: PayloadAction<string>) => {
      state.query.location = action.payload
    },
    setQueryTemperature: (state, action: PayloadAction<string>) => {
      state.query.temperature = action.payload
    },
    setQueryDepth: (state, action: PayloadAction<string>) => {
      state.query.depth = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload.contents
        state.error = null
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error
      })
  }
})

export const logActions = { ...logSlice.actions }

export default logSlice
