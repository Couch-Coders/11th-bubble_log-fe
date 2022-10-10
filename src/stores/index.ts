import { configureStore } from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useDispatch as useTypedDispatch,
  useSelector as useTypedSelector
} from 'react-redux'

import logSlice from './slices/log'

export const store = configureStore({
  reducer: {
    log: logSlice.reducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useDispatch: () => AppDispatch = useTypedDispatch
export const useSelector: TypedUseSelectorHook<RootState> = useTypedSelector
