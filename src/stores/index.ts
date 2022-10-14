import { configureStore } from '@reduxjs/toolkit';
import logSlice from '@stores/slices/log';
import userSlice from '@stores/slices/user';
import {
  TypedUseSelectorHook,
  useDispatch as useTypedDispatch,
  useSelector as useTypedSelector,
} from 'react-redux';

import logDetailSlice from './slices/logDetail';

export const store = configureStore({
  reducer: {
    log: logSlice.reducer,
    user: userSlice.reducer,
    logDetail: logDetailSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = useTypedDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useTypedSelector;
