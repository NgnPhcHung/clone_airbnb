import { LoremIpsum } from "lorem-ipsum";
import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation,
} from "react-simple-maps";
import styled from "styled-components";
import useWindowSize from "../../Hook/useWindowSize";
import {BsFillHouseFill} from 'react-icons/bs'

const MapChart = () => {
  const [width, height] = useWindowSize()
  const [random, setRandom] = useState({X:0, Y:0, Z:0})
  const [subject, setSubject] = useState({x:0, y:0})
  const lorem = new LoremIpsum({
    wordsPerSentence: {
      max: 7,
      min: 4
    }
  });
  useEffect(() =>{
    var X = Math.ceil(Math.random() * 180) * (Math.round(Math.random()) ? 1 : -1)
    var Y = Math.ceil(Math.random() * 180) * (Math.round(Math.random()) ? 1 : -1)
    var Z = Math.ceil(Math.random() * 180) * (Math.round(Math.random()) ? 1 : -1)
    setRandom({X, Y, Z})
    if(X <0) X *=-1
    if(Y <0) Y *=-1
    setSubject({x:X, y:Y})
  },[])

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
        {/* <Annotation
          subject={[subject.x, subject.y]}
          dx={-90}
          dy={-30}
          connectorProps={{
            stroke: "#FF5533",
            strokeWidth: 3,
            strokeLinecap: "round"
          }}
        >
          <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="#F53">
            {lorem.generateWords(1)}
          </text>
        </Annotation> */}
      </ComposableMap>
      <Marker>
        <div className="round"><BsFillHouseFill className="icon"/></div>
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
  
`

export default MapChart;
