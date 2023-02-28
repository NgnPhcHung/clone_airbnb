import {  motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from 'react-redux';
import { modalAction } from '../../Redux/Action/modalAction';
import { useOnClickOutside } from '../../Hook/useClickOutside';
import TabSelector from './TabSelector';
import Logo from '../Logo';
import { Right } from './index'
import ModalButtons from './ModalButtons';
import DropdownDestination from './DropdownDestination';
import DropdownDateRangepicker from './DropdownDateRangepicker';
import DropdownGuest from './DropdownGuest';
import { navbarAction } from '../../Redux/Action/navbarAction';
import useWindowSize from '../../Hook/useWindowSize';
import { BsX } from 'react-icons/bs';

export default function ExpandNavModal() {
  const ref = useRef(null)
  const dispatch = useDispatch()
  const bottomPosRef = useRef(null)
  const buttonsState = useSelector(state => state.navbar.btnName)
  const [width, ] = useWindowSize()
  const [useMobileVariant, setMobileVariant] = useState(false)
  const modalState =  useSelector(state => state.modal.navbarExpandModal)
  useEffect(() =>{  
    width <= 740 ?  setMobileVariant(true) :   setMobileVariant(false)
  },[width])
  const [buttonGr, setButtonGroup] = useState({
    buttons:[
      {
        id:1,
        title:'where',
        placeholder:'Search destinations',
        function: {},
        component: <DropdownDestination/>
      },
      {
        id:2,
        title:'check in',
        placeholder:'Add dates',
        function: {},
        component: <DropdownDateRangepicker/>
      },
      {
        id:4,
        title:'who',
        placeholder:'Add guests',
        function: {},
        component: <DropdownGuest/>
      }
    ],
    activate: 0
  })
  useOnClickOutside(ref, () => {
    closeModal()
  })
  useOnClickOutside(bottomPosRef, () =>{
    removeClass()
  })

  const toggleClass = id =>{
    setButtonGroup({...buttonGr, activate: id})
  }
  const removeClass = () =>{
    setButtonGroup({...buttonGr, activate: 0})
  }
  const closeModal = () =>{
    dispatch(modalAction.closeNavbar())
  }
  useEffect(() =>{
    if(buttonsState=== 'place') setButtonGroup({...buttonGr, activate: 1})
    if(buttonsState=== 'date') setButtonGroup({...buttonGr, activate: 2})
    if(buttonsState=== 'guest') setButtonGroup({...buttonGr, activate: 4})
    dispatch(navbarAction.close())
  },[])

  const variant = {
    initial:{
      opacity: [0.6,0.7,0.8,1],
      height: '5rem',
    },
    animate:{
      height: '10rem',
      opacity: 1,
      transition: {
        delay: 0.3
      }
    }
  }
  const mobileVariant = {
    initial:{
      opacity: [0.6,0.7,0.8,1],
      height: '5rem',
    },
    animate:{
      height: '95vh ',
      opacity: 1,
      transition: {
        delay: 0.3
      }
    }
  }
  
  return ReactDOM.createPortal(
      <Backdrop 
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1,
          transition: {
            delay: 0.075
          }
        }}
      >
        <Container
          ref={ref}
          variants={useMobileVariant? mobileVariant : variant}
          initial='initial'
          animate='animate'
          exit={{
            height: '100px',
            opacity: [0.8, 0.6, 0.4],
          }}
          transition={{ duration: 0.2}}
        >
         
          <div className="topPostion">
            <CloseBtn onClick={closeModal}>
              <BsX/>
            </CloseBtn>
            <Logo/>
            <TabSelector/>
            <Right />
          </div>
          <motion.div 
            className="bottomPostion" 
            ref={bottomPosRef}
            animate={{
              display: modalState? '': 'none'
            }}
          >
            {
              buttonGr.buttons.map((data, ) =>(
                <ModalButtons key={data.id} data ={data} activeNum ={buttonGr.activate} onClick={toggleClass}>{data.component}</ModalButtons>
              ))
            }
          </motion.div>
        </Container>
      </Backdrop>,
    document.getElementById('expandNavModal')
  )
}
const Backdrop = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 1001;
  display: flex;
  justify-content: center;
  top: 0;
  display: flex;
  background-color: ${props => `rgba(${props.theme.textRgba}, 0.2)`};
`
const Container = styled(motion.div)`
  width: 100%;
  background-color: ${(props) => props.theme.body};
  border-radius: 4px;
  padding: 1rem;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;

  .topPostion {
    display: flex;
    width: 95%;
    height: 2rem;
    align-items: center;
  }
  .bottomPostion{
    width: max-content;
    height: 4.5rem;
    background-color: ${props => props.theme.body};
    border: 1px solid ${props => props.theme.gray};
    border-radius: 40px;
    display: inline-grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: 1.5fr 10rem 1.2fr;
    position: relative;
  }
  .bottomPostion:has(.active){
    background-color: ${props =>`rgba(${props.theme.textRgba}, 0.1)`};
  }

  @media (max-width: 960px){
    .bottomPostion{
      width: calc(100% - 5vw);
    }
  }

  @media (max-width: 740px){
    justify-content: flex-start;
    
    .bottomPostion{
      margin-top: 10px;
      border: none;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: max-content;
    }
    .bottomPostion:has(.active){
      background-color: ${props => props.theme.body};
    }
  }
`
const CloseBtn = styled.button`
display: none;
position: absolute;
top: 2%;
left: 2%;
width: 2.3rem;
height: 2.3rem;
/* padding: 2.3rem; */
border: 1px  solid ${props => `rgba(${props.theme.textRgba}, 0.4)`};
border-radius: 50%;
font-size: ${props => props.theme.fontxl};
justify-content: center;
align-items: center;
cursor: pointer;
background-color: ${props => props.theme.body};
z-index: 999;

@media (max-width: 740px){
  display: grid;
}
`