import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit'
import { getLogsAPI } from '@apis/log'

export const fetchLogs = createAsyncThunk<GetLogsResponse, GetLogsQuery>(
  'log/fetchStatus',
  async (query: GetLogsQuery) => await getLogsAPI(query)
)

interface LogState {
  data: LogWithId[]
  isLoading: boolean
  error: SerializedError | null
}

const initialState: LogState = {
  data: [],
  isLoading: false,
  error: null
}

export const LogSlice = createSlice({
  name: 'log',
  initialState,
  reducers: {},
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

export const logActions = { ...LogSlice.actions }

export default LogSlice
