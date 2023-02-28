import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import BookingPanel from '../../Components/RoomInfo/BookingPanel'
import Details from '../../Components/RoomInfo/Details'
import Footer from '../../Components/Footer'
gsap.registerPlugin(ScrollTrigger);

export default function RoomDetails() {
  const ref= useRef(null)
  useEffect(() => {
    const element = ref.current;
    if(element){
      gsap.fromTo(
        element.querySelector(".container"),
        {
          y: 50
        },
        {
          y: 960,
          ease: "expo",
          scrollTrigger: {
            trigger: element.querySelector(".roomInfo"),
            start: "480px",
            end: "+=1500px",
            scrub: true,
            
          }
        }
      );
    }
    
  }, []);
  return (
    <Container ref={ref} className='roomInfo'>
      <Details/>
      <BookingPanel/>
      <Footer />
    </Container>
  )
}

const Container = styled.div`
  width:calc(100% - 25vw);
  height:fit-content;
  display: flex;
  position: relative;
  overflow: hidden;
`