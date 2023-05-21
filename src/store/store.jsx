import { configureStore } from '@reduxjs/toolkit'
import  homeSlice  from './HomeSlice'
 
 
export const store = configureStore({
  reducer: {
    home:homeSlice
  },
})