import { AnimatePresence } from 'framer-motion'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import CurrencyModal from '../Footer/CurrencyModal'
import LanguageModal from '../Footer/LanguageModal'
import ExpandNavModal from '../Nav/ExpandNavModal'
import ShowImageModal from '../RoomInfo/ShowImageModal'

export default function AppLayout() {
  const modals = useSelector(state => state.modal)
  useEffect(() => {
    if(modals.navbarExpandModal ||modals.currencyModal || modals.languageModal ){
      document.querySelector(':root').style.overflowY = 'hidden'
    }document.querySelector(':root').style.overflowY=''
  },[modals])
  return (
    <Container>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {modals.navbarExpandModal && <ExpandNavModal/>}
        {modals.currencyModal && <CurrencyModal/>}
        {modals.languageModal && <LanguageModal/>}
        {modals.showAllImgModal && <ShowImageModal/>}
      </AnimatePresence>
      <Outlet/>
    </Container>
  )
}
const Container= styled.div`
  width: 100vw;
  height: fit-content;
`
