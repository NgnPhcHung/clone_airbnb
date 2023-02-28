import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react'
import { BsX } from 'react-icons/bs';
import styled from 'styled-components';
import { useOnClickOutside } from '../../Hook/useClickOutside';
import useWindowSize from '../../Hook/useWindowSize'

export default function ModalTemplates(props) {
  const desktopVariant = {
    initial: {
      height: '10vh'

    },
    animate:{
      height: ["10vh", "10vh", "85vh"],
      opacity: 1,
    },
    exit:{
      height: ["85vh", "85vh", "0vh"],
      opacity: [1,1,1,0],
    }
  }
  const mobileVariant = {
    initial: {
      opacity: 1,
      bottom: '-10%'
    },
    animate:{
      height: ['90%', '90%'],
      opacity: [1, 1, 1],
      top: ['100%', '0%'],
    },
    exit:{
      height: '10vh',
      top: '100%',
      opacity: [1,1,1,0],
    }
  }
  const ref= useRef(null)
  const [variant, setVariant] = useState(desktopVariant)
  useOnClickOutside(ref, () => props.toggleModal())
  const[width, ] = useWindowSize()
  

  useEffect(() =>{
    width <= 740? setVariant(mobileVariant): setVariant(desktopVariant)
  },[width])

  return (
    <Backdrop>
      <MotionDiv 
        ref={ref}
        variants={variant}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ duration: 0.5 }}  
      >
        <CloseBtn onClick={() =>props.toggleModal()} ><BsX/></CloseBtn>
        <div className="line"/>
        {props.children}
      </MotionDiv>
    </Backdrop>
  )
}

const Backdrop = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 1001;
  display: grid;
  place-items: center;
  top: 0;
  background-color: ${(props) => `rgba(${props.theme.textRgba}, 0.5)`};

  @media (max-width: 740px){
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;
const MotionDiv = styled(motion.div)`
  z-index: 1001;
  width: 65vw;
  background-color: ${(props) => props.theme.body};
  border-radius: 20px;
  padding: 1rem;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  overflow: hidden;
  
  .line{
    width: 100%;
    border-bottom: 1px solid ${(props) => `rgba(${props.theme.textRgba},0.3)`};
  }

  @media (max-width: 740px){
    width: calc(100vw - 2rem);
    bottom: '10px';
    overflow: hidden;
  }
`;
const CloseBtn = styled.button`
  background-color: transparent;
  z-index: 5;
  cursor: pointer;
  top: 15px;
  left: 15px;
  border: none;
  outline: none;
  padding:0.4rem;
  border-radius: 50%;

  font-size: ${props => props.theme.fontxl};
`