import { useState } from 'react'
import { BsFillMapFill, BsListUl } from 'react-icons/bs'
import styled from 'styled-components'
import Footer from '../Components/Footer'
import Nav from '../Components/Nav'
import Searchbar from '../Components/Nav/Searchbar'
import BodyDisplay from '../Section/Body/BodyDisplay'
import Map from '../Section/Body/Map'

export default function Home() {
  const [toggleView, setToggleView] = useState(true)

  return (
    <HomeContainer>
      <Nav show={true} >
        <Searchbar/>
      </Nav>
      {
        toggleView? <BodyDisplay/> : <Map/>
      }
      <Footer/>
      <ToggleViewBtn onClick={() =>{setToggleView(!toggleView)}}>
      {
        toggleView? 
        <div style={{display:'flex', width:'100%',justifyContent:'space-evenly', alignItems:'center'}} >Toggle Map<BsFillMapFill/></div>:
        <div style={{display:'flex', width:'100%',justifyContent:'space-evenly', alignItems:'center'}} >Toggle list<BsListUl/></div>
      }
      </ToggleViewBtn>
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  width: 100vw;
  height: fit-content;
  background-color: ${props => props.theme.body};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const ToggleViewBtn = styled.button`
  background-color: ${props => props.theme.text};
  height: 3.5rem;
  padding: 0 1rem;
  position: fixed;
  bottom: 10%;
  border-radius: 40px;
  color: ${props => props.theme.body};
  z-index: 20;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.4s ease;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
  width: clamp(160px,10rem, 200px);

  &:hover{
    transform: scale(1.1);
  }
`