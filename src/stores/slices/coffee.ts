import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit'
import { getHotCoffees, getHotCoffeesWithError } from '@apis/coffee'

export const fetchHotCoffees = createAsyncThunk<GetHotCoffeesResponseType>(
  'coffee/hot/fetchStatus',
  getHotCoffees
)

export const fetchHotCoffeesWithError =
  createAsyncThunk<GetHotCoffeesResponseType>(
    'coffee/hot/fetchStatusWithError',
    getHotCoffeesWithError
  )

interface CoffeeState {
  data: GetHotCoffeesResponseType
  isLoading: boolean
  error: SerializedError | null
}

const initialState: CoffeeState = {
  data: [],
  isLoading: false,
  error: null
}

export const coffeeSlice = createSlice({
  name: 'coffee',
  initialState,
  reducers: {},
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
