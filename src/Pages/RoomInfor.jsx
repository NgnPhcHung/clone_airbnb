import React from 'react'
import styled from 'styled-components'
import Intro from '../Section/RoomInfo/Intro'
import RoomDetails from '../Section/RoomInfo/RoomDetails'

export default function RoomInfor() {
  return (
    <Container>
      <Intro/>
      <RoomDetails/>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`