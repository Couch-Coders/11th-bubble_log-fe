import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  PayloadAction
} from '@reduxjs/toolkit'
import { LoginResponse } from 'types/auth'

import { loginAPI } from '@apis/auth'

export const fetchUser = createAsyncThunk<LoginResponse, string>(
  'user/fetchStatus',
  async (token: string) => await loginAPI(token)
)

interface UserState {
  isLoggedIn: boolean
  isLoading: boolean
  error: SerializedError | null
}

const initialState: UserState = {
  isLoggedIn: false,
  isLoading: false,
  error: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoggedIn (state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUser.fulfilled, (state) => {
        state.isLoading = false
        state.isLoggedIn = true
        state.error = null
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error
      })
  }
})

export const userActions = { ...userSlice.actions }

export default userSlice
