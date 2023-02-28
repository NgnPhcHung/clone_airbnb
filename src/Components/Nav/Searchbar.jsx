import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {GoSearch} from 'react-icons/go'
import { useOnClickOutside } from '../../Hook/useClickOutside'
import { useDispatch, useSelector } from 'react-redux'
import { navbarAction } from '../../Redux/Action/navbarAction'
import { modalAction } from '../../Redux/Action/modalAction'
import useWindowSize from '../../Hook/useWindowSize'
import SmallSearch from './SmallNav'

export default function Searchbar() {
  const ref = useRef()
  const dispatch = useDispatch()
  const [width, ] = useWindowSize()
  const [useSmall, setUseSmall] = useState(false)
  const [containerActive, setContainerActive] = useState(false)
  const modalState = useSelector(state => state.modal.navbarExpandModal)

  useOnClickOutside(ref, () => {
    !modalState && setContainerActive(false)
    close()
  })
  const containerVariant = {
    initial: {
      opacity: [0,1],
      height: '50%',
      transform: ['scale(1.6) scaleX(1.4)', 'scale(1) scaleX(1)'],
      transition: {
        delay: 0.225
      }
    },
    animate: {
      opacity: [1,1,0.75,0],
      transform: 'scale(1.6)',
      height: '65%',
    }
  }

  const open = (type) =>{
    setContainerActive(true)
    dispatch(navbarAction.open(type))
    dispatch(modalAction.openNavbar())
  }
  const close = () =>{
    dispatch(navbarAction.close())
  }
  
  useEffect(() =>{
    if(width <= 740){
      return setUseSmall(true)
    }setUseSmall (false)
  },[width])

  useEffect(() =>{
    modalState===false && setContainerActive(false)
  },[modalState])

  return (
    <AnimatePresence >
    {
        useSmall? 
        <SmallSearch
          onClick = {() =>{
            setContainerActive(true)
            dispatch(modalAction.openNavbar())
          }}
        />:
        <Container
          initial={false}
          ref={ref}
          variants={containerVariant}
          active = {containerActive? containerActive.toString() : undefined}
          animate={containerActive? 'animate': 'initial'}
          transition={{duration: 0.3}}
        >
          <button onClick={() =>open('place')}>AnyWhere</button>
          <button onClick={() =>open('date')}>AnyWeek</button>
          <button onClick={() =>open('guest')}>
          Add Guest
          <GoSearch className='icon'/>
        </button>
      </Container>
      }
    </AnimatePresence>
  )
}

const Container = styled(motion.div)`
  width: fit-content;
  height: 50%;
  background-color: ${props => props.theme.body};
  border-radius: 40px;
  border: 1px solid ${props => props.theme.gray};
  padding: 0 0.7rem;
  align-items: center;
  display: inline-grid;
  grid-template-columns: auto auto auto ;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
  position: relative;
  white-space: nowrap;
  text-overflow: ellipsis;
  
  &::after{
    content: '';
    position: absolute;
    width: 150vw;
    height: 1px;
    background-color: ${props => props.theme.gray};
    top: 140%;
    left: 100%;
    transform: translate(-50%, -50%);
  }
  

  & button{
    /* display: ${props => props.active ? 'none' : ''}; */
    font-size: ${props => props.theme.fontsm};
    position: relative;
    background: ${props => props.theme.body};
    border: none;
    outline: none;
    height: 90%;
    width: 6rem;
    margin-right: 5px;
    font-weight: bold;
    color: ${props => props.theme.text};
    cursor: pointer;
    position: relative;
    overflow: hidden !important;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & button:not(:nth-child(2)){
    width: 6rem;
    margin-right: 0;
    margin-left: 0;
  }

  & button:nth-child(3) {
    color: ${props => `rgba(${props.theme.textRgba}, 0.6)`};
    /* display: ${props => props.active ? 'none' : 'flex'}; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 8rem;
    font-weight: lighter;
  }
  & button:nth-child(3) .icon{
    padding: 0.6rem;
    background-color: ${props => props.theme.logo};
    border-radius: 40px;
    color: ${props => props.theme.body};
    font-size: ${props => props.theme.fontmd};
  }
  & button:not(:nth-child(3))::after{
    content: '';
    position: absolute;
    width: 1px;
    height: 10px;
    background-color: ${props => `rgba(${props.theme.textRgba},0.3)`};
    height: 60%;
    top: 50%;
    right: 0%;
    transform: translate(-50%, -50%);
  }

  @media (max-width: 740px){

    & button::after{
      display: none;
    }
  }
`