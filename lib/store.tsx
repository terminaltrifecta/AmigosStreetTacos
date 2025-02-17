import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '@/slices/cartSlice'
import locationReducer from '@/slices/locationSlice'
import menuReducer from '@/slices/menuSlice'
import timeReducer from '@/slices/timeSlice'

export const makeStore = () => {
  return configureStore({
      reducer: {
        cart: cartReducer,
        location: locationReducer,
        menu: menuReducer,
        time: timeReducer
      }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']