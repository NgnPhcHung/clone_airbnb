import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {BsFillStarFill} from 'react-icons/bs'
import DatePaper from './DatePaper'
import { TextField } from '@mui/material'
import { useOnClickOutside } from '../../Hook/useClickOutside'
import DropdownGuest from '../Nav/DropdownGuest'

export default function BookingPanel() {
  const guestRef=  useRef(null)
  const [info, setInfo] = useState({rating: 0, price: 0})
  const [showGuest, setShowGuest] = useState(false)
  useOnClickOutside(guestRef,  () =>setShowGuest(false) )
  useEffect(() =>{
    const rating = Math.floor(Math.random() * (5 * 100 - 1 * 100) + 1 * 100) / (1 * 100)
    const price = Math.floor(Math.random()*(1000 - 1 + 1)) + 1 
    setInfo({rating, price})
    // }
  },[])

  return (
    <Container className='container'>
      <div className="header">
        <div className="left">
          <h2>${info.price}</h2>
          <p>night</p>
        </div>
        <div className="right">
          <div className="rating">
            <BsFillStarFill/>
            {info.rating}
          </div>
        </div>
      </div>
      <Body>
        <DatePaper label='Check in'/>
        <DatePaper label='Check out'/>
        <CustomTextField onClick={() => setShowGuest(true)} label='Add Guests' focused fullWidth style={{gridColumn:'1/3'}} />
      </Body>
      {
        showGuest && <GuestWrap ref={guestRef}>
        <DropdownGuest/>
      </GuestWrap>
      }
      <Button className='btn' >Check available</Button>
    </Container>
  )
}
const Container= styled.div`
  width: 25vw;
  height: fit-content;
  background-color: ${props => props.theme.body};
  border-radius: 10px;
  position: absolute;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  right: 2%;
  padding: 1rem ;
  .header{
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: space-between;
  }
  .header .left, .header .right{
    display: flex;
    align-items: center;
  }

  @media (max-width: 740px){
    display: none;
  }
`
const Body = styled.div`
  height: fit-content;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  grid-gap: 10px;
`
const GuestWrap = styled.div`
  width: fit-content;
  height: fit-content;
  background-color: ${props => props.theme.body};
`
const CustomTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: props => `rgba(${props.theme.textRgba}, 0.7)`,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: props => `rgba(${props.theme.textRgba}, 0.7)`,
  },
  '& .MuiOutlinedInput-root': {
    
    '&:hover fieldset': {
      borderColor: props => `rgba(${props.theme.textRgba}, 0.7)`,
    },
    '&.Mui-focused fieldset': {
      borderColor: props => `rgba(${props.theme.textRgba}, 0.7)`,
    },
  },
})
const Button = styled.div`
  margin-top: 10px;
  width: calc(100% -15rem);
  height: 3rem;
  border-radius: 10px;
  background-color: ${props => props.theme.logo};
  position: relative;
  display: grid;
  place-items: center;
  color: ${props => props.theme.body};
`