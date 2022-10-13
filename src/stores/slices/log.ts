import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  PayloadAction
} from '@reduxjs/toolkit'
import { GetLogsQuery, GetLogsResponse, LogWithId } from 'types/log'

import { getLogsAPI } from '@apis/log'

export const fetchLogs = createAsyncThunk<GetLogsResponse, GetLogsQuery>(
  'log/get/fetchStatus',
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
    startDate: '',
    endDate: '',
    diveType: '',
    location: '',
    minDepth: '',
    maxDepth: '',
    minTemperature: '',
    maxTemperature: '',
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
      state.query.diveType = action.payload
    },
    setQueryLocation: (state, action: PayloadAction<string>) => {
      state.query.location = action.payload
    },
    setQueryTemperature: (state, action: PayloadAction<string>) => {
      const temperatureString = action.payload

      const minTemperature = temperatureString.split('-')[0]
      const maxTemperature = temperatureString.split('-')[1]

      state.query.minTemperature = minTemperature
      state.query.maxTemperature = maxTemperature
    },
    setQueryDepth: (state, action: PayloadAction<string>) => {
      const depthString = action.payload

      const minDepth = depthString.split('-')[0]
      const maxDepth = depthString.split('-')[1]

      state.query.minDepth = minDepth
      state.query.maxDepth = maxDepth
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
