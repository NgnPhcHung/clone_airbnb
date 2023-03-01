import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import styled from "styled-components";
import {BsFillHouseFill} from 'react-icons/bs'
import {AiFillCaretDown} from 'react-icons/ai'
import {motion} from 'framer-motion'


const MapChart = () => {
  const [random, setRandom] = useState({X:0, Y:0, Z:0})
 
  useEffect(() =>{
    var X = Math.ceil(Math.random() * 180) * (Math.round(Math.random()) ? 1 : -1)
    var Y = Math.ceil(Math.random() * 180) * (Math.round(Math.random()) ? 1 : -1)
    var Z = Math.ceil(Math.random() * 180) * (Math.round(Math.random()) ? 1 : -1)
    setRandom({X, Y, Z})
    if(X <0) X *=-1
    if(Y <0) Y *=-1
  },[])

  const hoverVariant = {
    initial:{
      opacity: 1,
      transition: {
        ease: 'easeInOut',
        delay: 3
      }
    },
    hover:{
      opacity: 0,
      transition:{
        duration: 0.5,
      }
    }
  }

  return (
    <Container  iner id='location'>
      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [random.X, random.Y, random.Z],
          center: [-5, -3], 
          scale: 300,
        }}
        fill='#4293AD'
      >
      <Geographies
        geography="/features.json"
        fill="#4BA146 "
        stroke="#fff"
        strokeWidth={0.5}
      >
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
      </ComposableMap>
      <Marker>
        <div className="round"><BsFillHouseFill className="icon"/></div>
        <motion.div 
          className="dialog"
          variants={hoverVariant}
          whileHover='hover'
          exit='initial'
          transition={{
            delay: 3
          }}
        >
          <Dialog>
            <p>Exact location provied after booking.</p>
            <AiFillCaretDown className="down" />
          </Dialog>
        </motion.div>
      </Marker>
    </Container>
  );
};

const Container = styled.div`
  width:90vw;
  height: 70vh;
  background-color: #4293AD;
  border-radius: 5px;
  position: relative;
`
const Marker = styled.div`
  background-color: rgba(255, 89, 30, 0.5);
  border-radius: 50%;
  width: 10vw;
  height: 10vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) ;

  .round{
    width: 50%;
    height: 50%;
    background-color: ${props => props.theme.logo};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) ;
    border-radius: 50%;
  }

  .icon{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) ;
    font-size: ${props => props.theme.fontxl};
    color: ${props => props.theme.body};
  }

  .dialog{
    width: fit-content;
    height: fit-content;
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translate(-50%, -50%) ;
  }
  
`

const Dialog = styled.div`
  background-color: ${props => props.theme.body};
  border-radius: 10px;
  font-size: ${props => props.theme.fontsm};
  position: relative;
  width: max-content;
  padding: 0.5rem 1rem;
  height: 2rem;
  
  .down{
    position: absolute;
    top: 110%;
    left: 50%;
    transform: translate(-50%, -50%) ;
    font-size: ${props => props.theme.fontxl};
    color: ${props => props.theme.body};
  }
`

export default MapChart;
