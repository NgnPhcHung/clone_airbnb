import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import useWindowSize from '../../Hook/useWindowSize';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
gsap.registerPlugin(ScrollTrigger);

export default function RoomNav() {
  const [click, setClick] = useState(false);
  const [width, ] = useWindowSize()
  const scrollRef = useRef(null);
  const scrollTo = (id) => {
    let element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    setClick(!click);
};
 
  return (
    <Nav className='roomNav' ref={scrollRef}>
      {
        width > 740 ? 
        <Container>
        <Item onClick={() => scrollTo('photo')}>Photos</Item>
        <Item onClick={() => scrollTo('info')}>Info</Item>
        <Item onClick={() => scrollTo('offers')}>Offers</Item>
        <Item onClick={() => scrollTo('location')}>Location</Item>
      </Container>:
      <Link to='/'>
        <Mobile><IoIosArrowBack/><p>  Homes </p></Mobile>
      </Link> 
      }
    </Nav>
  )
}

const Nav = styled.div`
  display: none;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  width: 100%;
  height: 3rem;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1001;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.body};
`
const Container = styled.div`
  max-width: 40%;
  min-width: calc(50% - 5rem);
  height: 50%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

`
const Item = styled.p`
  font-weight: bold;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100%;
  &::after{
    left: 0;
    bottom: -100%;
    content: '';
    background-color: ${props => props.theme.text};
    position: absolute;
    width: 100%;
  }
  &:hover::after{
    height: 5px;
  }
`
const Mobile = styled.div`
  height: 3rem;
  width: 30vw;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`