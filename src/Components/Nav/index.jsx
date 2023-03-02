import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Logo from '../Logo'
import Dropdown from './Dropdown'
import Searchbar from './Searchbar'
import {BiGlobe} from 'react-icons/bi'
import CategoriesSlider from './CategoriesSlider'
import useWindowSize from '../../Hook/useWindowSize'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrollPosition } from '../../Hook/useScrollPosition'

export const Right = () =>{
  return (
  <RightContainer>
    <p>Airbnb your home</p>
    <BiGlobe className='globe'/>
    <Dropdown/>
  </RightContainer>)
}

export default function Nav(props) {
  const [fixedClass, setFixedClass] = useState(false);
  const scrollPos = useScrollPosition()
  const [showSlider, setShowSlider] = useState(true)
  useEffect(() => {
    !props.inherit && scrollPos > 0? setFixedClass(true) : setFixedClass(false)
  }, [scrollPos]);
  const [width, ] = useWindowSize()

  useEffect(() =>{
    if(!props.show || width < 740 )
     return setShowSlider(false)
     setShowSlider(true)
  },[props.show, width])

  const fixVariant =  {
    default:{
      position: 'relative',
      transform: 'translateY(0)',
      top:0,
    },
    fix:{
      position: 'fixed',
      transform: ['translateY(-40px)','translateY(0)'],
      top: ['-5%', '0'],
    }
  }
  return (
    <AnimatePresence
      initial={false}
    >
      <Container 
        show={props.show? props.show.toString() : undefined}
        initial={false}
        variants={fixVariant}
        animate={fixedClass? 'fix':'default'}
        transition={{ duration: 0.5 }}
      >
        <div className="left">
          <Logo/>
          {props.children}
        </div>
        <Right/>
        {showSlider && <CategoriesSlider/>}
      </Container>
    </AnimatePresence>
  )
}

const RightContainer = styled.div`
  width: 25rem;
  height: 4rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-weight: bold;
  grid-column: 3 / 3;

  & > *{
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 40px;
  } 
  & > *:not(:nth-child(3)), .globe{
    font-size: ${props => props.theme.fontmd};
  }
  & > *:not(:nth-child(3)):hover{
    padding: 0.5rem;
    background: ${props => `rgba(${props.theme.textRgba}, 0.06)`};
  } 

  @media (max-width: 950px){
    width: fit-content;
    white-space: nowrap;
    text-overflow: ellipsis;
    justify-content: flex-end;

    & ~ p {
      font-size: ${props => props.theme.fontmd};
    }
  }
  @media (max-width: 740px){
    display: none;
  }
`
const Container = styled(motion.div)`
  width: 100vw;
  height: ${props => props.show? '11.5rem' : '7rem'};
  background-color: ${props => props.theme.body};
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${props => props.show? 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px':''} ;  
  z-index: 100;
  .left{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 60vw;
    grid-column: 1 / 2;
  }

  @media (max-width: 950px){
    .left{
      width: 50vw;
      padding-left: calc(25% - 14vw);
    }
  }

  @media (max-width: 740px){
    height: fit-content;
    display: flex;
    justify-content: center;
    padding: 0.5rem 0;
    .right{
      display: none;
    }
    .left{
      width:90vw;
      padding-left: 0;
    }
  }
`
