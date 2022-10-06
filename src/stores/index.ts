import { configureStore } from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useDispatch as useTypedDispatch,
  useSelector as useTypedSelector
} from 'react-redux'
import coffeeSlice from '@stores/slices/coffee'

export const store = configureStore({
  reducer: {
    coffee: coffeeSlice.reducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useDispatch: () => AppDispatch = useTypedDispatch
export const useSelector: TypedUseSelectorHook<RootState> = useTypedSelector
