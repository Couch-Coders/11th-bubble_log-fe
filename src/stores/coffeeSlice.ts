import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit'
import { getHotCoffees, getHotCoffeesWithError } from '@services/api/coffee'

export const fetchHotCoffees = createAsyncThunk<GetHotCoffeesResponseType>(
  '/coffee/hot/fetchStatus',
  async (_, thunkAPI) => {
    try {
      const response = await getHotCoffees()
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.status)
    }
  }
)

export const fetchHotCoffeesWithError =
  createAsyncThunk<GetHotCoffeesResponseType>(
    '/coffee/hot/fetchStatusWithError',
    async (_, thunkAPI) => {
      try {
        const response = await getHotCoffeesWithError()
        return response.data
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.status)
      }
    }
  )

interface coffeeState {
  data: GetHotCoffeesResponseType
  isLoading: boolean
  error: null | SerializedError
}

const initialState: coffeeState = {
  data: [],
  isLoading: false,
  error: null
}

export const coffeeSlice = createSlice({
  name: 'coffee',
  initialState,
  reducers: {
    // standard reducer logic
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotCoffees.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchHotCoffees.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
        state.error = null
      })
      .addCase(fetchHotCoffees.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error
      })

    builder
      .addCase(fetchHotCoffeesWithError.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchHotCoffeesWithError.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(fetchHotCoffeesWithError.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error
        state.data = []
      })
  }
})

export const coffeeActions = { ...coffeeSlice.actions }

export default coffeeSlice
