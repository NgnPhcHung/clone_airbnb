import  { createSlice } from '@reduxjs/toolkit'
import { modalAction } from './modalAction'

const navbarSlice = createSlice({
  name: 'navbar',
  initialState:{
    btnName: ''
  },
  reducers:{
    close(state){
      state.btnName = ''
    },
    open(state, action){
      let type = action.payload
      state.btnName = type
    }
  },  
  extraReducers: (builder) =>{
    builder.addCase(modalAction.closeNavbar, (state, action) =>{
      state.btnName = ''
    })
  }
})

export const navbarAction = navbarSlice.actions
export default navbarSlice