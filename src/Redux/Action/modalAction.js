import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: 'modals',
  initialState: {
    navbarExpandModal: false,
    currencyModal: false, 
    languageModal: false,
    showAllImgModal: false,
  },
  reducers: {
    openNavbar (state) {
      state.navbarExpandModal = true
    },
    closeNavbar (state) {
      state.navbarExpandModal = false
    },
    toggleCurrency (state) {
      state.currencyModal = !state.currencyModal
    },
    toggleLanguage (state) {
      state.languageModal = !state.languageModal
    },
    toggleShowAllImg (state) {
      state.showAllImgModal =!state.showAllImgModal
    }
  }
})

export const modalAction = modalSlice.actions
export default modalSlice