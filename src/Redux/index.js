import { configureStore } from '@reduxjs/toolkit'
import modalSlice from './Action/modalAction'
import navbarSlice from './Action/navbarAction'

const store = configureStore({
  reducer:{
    navbar: navbarSlice.reducer,
    modal: modalSlice.reducer
  }
})

export default store