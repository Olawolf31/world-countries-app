import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import countrySlice from '../redux/countries/countrySlice'
import themeSlice from '../redux/theme/themeSlice'

export const store = configureStore({
  reducer: {
    countries: countrySlice,
    theme: themeSlice
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
