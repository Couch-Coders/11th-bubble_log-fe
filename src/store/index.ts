import { configureStore } from '@reduxjs/toolkit';
import logSlice from '@store/slices/log';
import logCreateSlice from '@store/slices/logCreate';
import logDetailSlice from '@store/slices/logDetail';
import userSlice from '@store/slices/user';
import {
  TypedUseSelectorHook,
  useDispatch as useTypedDispatch,
  useSelector as useTypedSelector,
} from 'react-redux';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    log: logSlice.reducer,
    logDetail: logDetailSlice.reducer,
    logCreate: logCreateSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = useTypedDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useTypedSelector;
