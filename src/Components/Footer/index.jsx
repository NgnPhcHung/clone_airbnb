import React from 'react'
import styled from 'styled-components'
import {BsGlobe} from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { modalAction } from '../../Redux/Action/modalAction'

export default function Footer() {
  const dispatch = useDispatch()

  const openLanguage = ()=>{
    dispatch( modalAction.toggleLanguage() )
  }
  const openCurrency = ()=>{
    dispatch( modalAction.toggleCurrency() )
  }

  return (
    <Container>
      <Left>
        <p>© 2023 Airbnb clone.</p>
        <p>By Phúc Hưng</p>
      </Left>
      <Right>
        <p onClick={openLanguage} ><BsGlobe/> English</p>
        <p onClick={openCurrency}>USA</p>
        <p>Support & Resource ^</p>
      </Right>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: ${props => props.theme.body};
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;

  @media (max-width: 740px){
    height: 30vh;
    width: 100vw;
    display: grid;
    place-content: start;
    grid-template-columns: 10rem;
    grid-gap: 1rem;
    position: relative;
    top: 0;
    box-shadow: none;
    padding-left: 2rem;
  }
`
const Left = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(10rem, 100%), 1fr));
  width: 55%;
  margin-left: 10px;
  @media (max-width: 740px){
    margin-left: 0;
    grid-template-column: 1fr;
    width: 45vw;
  }
`
const Right = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: space-evenly;
  width: 40%;

  p{
    font-weight: bold;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;
  }
  p:hover{
    text-decoration: underline;
  }
  
  @media (max-width: 740px){
    display: grid;
    place-items: start;
    grid-row-gap: 1rem;
    width: 30vw;
    font-size: ${props => props.theme.fontmd};
    margin: 0;
    padding: 0;
  }
`