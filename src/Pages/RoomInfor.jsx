import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Footer2 from '../Components/Footer/Footer2'
import RoomNav from '../Components/RoomInfo/RoomNav'
import Intro from '../Section/RoomInfo/Intro'
import RoomDetails from '../Section/RoomInfo/RoomDetails'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Nav from '../Components/Nav'
import StartSearchBox from '../Components/Nav/StartSearchBox'
gsap.registerPlugin(ScrollTrigger);

export default function RoomInfor() {
  const ref= useRef(null)

  useEffect(() => {
    const element = ref.current;
    if(element){
      gsap.fromTo(
        element.querySelector(".roomNav"),
        {
          display: 'none',
          y: -10
        },
        {
          display: 'block',
          y: 0,
          scrollTrigger: {
            trigger: element.querySelector(".details"),
            start: "200px",
            end: "end end",
            scrub: true,
            
          }
        }
      );
    }
    
  }, []);

  return (
    <Container ref={ref} className='details'>
      <Nav inherit={true} show={false} >
        <StartSearchBox/>
      </Nav>
      <RoomNav/>
      <Intro/>
      <RoomDetails/>
      <Footer2/>
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