import React, { useEffect, useState } from "react";
import {
  Annotation,
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import styled from "styled-components";

import useWindowSize from "../../Hook/useWindowSize";


const MapChart = () => {
  const [width, ] = useWindowSize()
  const [random, setRandom] = useState({X:0, Y:0, Z:0})
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

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

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  const handleMoveEnd = (position) => {
    setPosition(position);
  }

  return (
    <Container  iner id='location'>
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{
          rotate: [random.X, random.Y, random.Z],
          center: [-5, -5], 
          scale: 600,
        }}
        fill='#4293AD'
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
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
            <Annotation
              subject={[random.X*-1 , random.Y*-1]} 
              dx={-90}
              dy={-30}
              fill="#fafafa"
              connectorProps={{
                stroke: "#dc4040",
                strokeWidth:2,
                strokeLinecap: "round",
              }}
              curve={0.5}
            >
          <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="#202020" fontSize={10} fontWeight='bolder' >
            {"This location"}
          </text>
        </Annotation>
        <Marker coordinates={[random.X*-1 , random.Y*-1]}>
          <circle r={25} fill="#F53" opacity={1}/>
        </Marker>
        </ZoomableGroup>
      </ComposableMap>
      {/* <CusMarker>
          <div className="round"><BsFillHouseFill className="icon"/></div>
          <motion.div 
            className="dialog"
            variants={width > 740 && hoverVariant}
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
        </CusMarker> */}
    </Container>
  );
};

const Container = styled.div`
  width:90vw;
  height: 70vh;
  background-color: #4293AD;
  border-radius: 5px;
  position: relative;
  overflow: hidden;

  @media (max-width: 740px){
    height: 240px;
  }
`
// const CusMarker = styled.div`
//   background-color: rgba(255, 89, 30, 0.5);
//   border-radius: 50%;
//   width: 15vw;
//   height: 15vw;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%) ;

//   .round{
//     width: 50%;
//     height: 50%;
//     background-color: ${props => props.theme.logo};
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%) ;
//     border-radius: 50%;
//   }
//   .icon{
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%) ;
//     font-size: ${props => props.theme.fontxl};
//     color: ${props => props.theme.body};
//   }
//   .dialog{
//     width: fit-content;
//     height: fit-content;
//     position: absolute;
//     top: 0%;
//     left: 50%;
//     transform: translate(-50%, -50%) ;
//     box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
//   }
//   @media (max-width: 740px){
//     width: 25vw;
//     height: 25vw;

//     .dialog{
//       top: -5vh;
//   }
//   }
// `

// const Dialog = styled.div`
//   background-color: ${props => props.theme.body};
//   border-radius: 10px;
//   font-size: ${props => props.theme.fontsm};
//   position: relative;
//   width: max-content;
//   padding: 0.5rem 1rem;
//   height: 2rem;
  
//   .down{
//     position: absolute;
//     top: 110%;
//     left: 50%;
//     transform: translate(-50%, -50%) ;
//     font-size: ${props => props.theme.fontxl};
//     color: ${props => props.theme.body};
//   }
// `

export default MapChart;
