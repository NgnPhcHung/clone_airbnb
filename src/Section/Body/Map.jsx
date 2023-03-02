import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { LoremIpsum } from "lorem-ipsum";
import useWindowSize from "../../Hook/useWindowSize";
import { createClient } from "pexels";
import { Link } from "react-router-dom";
import {HiLocationMarker} from 'react-icons/hi'

export default function Map() {
  const [width, ] = useWindowSize()
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [coordinates, setCoordinates] = useState([
    { markerOffset: 15, name: "Hà Nội", coordinates: [104.6, 25.7], id:'' },
  ]);
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 4,
    },
  });
  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
  };
  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  };
  const handleMoveEnd = (position) => {
    setPosition(position);
  };

  useEffect(() => {
    const settingMarker = async () => {
      await Array(91)
        .fill()
        .map(() => {
          let page =1
          let x =
            Math.ceil(Math.random() * 180) *
            (Math.round(Math.random()) ? 1 : -1);
          let y =
            Math.ceil(Math.random() * 180) *
            (Math.round(Math.random()) ? 1 : -1);
          let name = lorem.generateWords(1);
          let id = ''
          const client = createClient('R1uHcrabd1rm4zaMFGBGRBF2IeF1yPK2JTobJ1AfK5MWDParzrMptrn8');
          client.collections.featured({ per_page: 90, page: page }).then(collections => {
            collections.collections.map((dt, ) =>{
              id=dt.id
            })
          setCoordinates((oldCors) => [
            ...oldCors,
            { markerOffset: 15, name, coordinates: [x, y], id },
          ]);
        });
      page++
    });
  }
  settingMarker();
  }, []);

  useLayoutEffect(() =>{
    setCoordinates([{ markerOffset: 15, name: "Hà Nội", coordinates: [104.6, 25.7], id:'' }])
  },[])

  return (
    <Container>
      <ComposableMap projection="geoEqualEarth"
        height={width>740? 600 : 1300}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies
            fill="#4BA146 "
            stroke="#fff"
            strokeWidth={0.5}
            geography="/features.json"
          >
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
          {coordinates.map(({ name, coordinates, markerOffset, id }, i) => {
            return (
              <Marker key={i} coordinates={coordinates}>
                <Link to={`/room/${id}`} target={width> 740 ? '_blank':''} rel={width > 740 ? 'noopener noreferrer' : ''}>
                  {/* <g
                    fill="none"
                    stroke="#FF5533"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="translate(-12, -24)"
                    
                  >
                    <circle cx="12" cy="10" r="3" />
                    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" id="scale" className="two grow" />
                  </g> */}
                  <HiLocationMarker className="locationIcon" />
                  <text
                    textAnchor="middle"
                    y={markerOffset}
                    style={{
                      fontFamily: "system-ui",
                      fill: "#5D5A6D",
                      fontSize: "5px",
                    }}
                  >
                    {name}
                  </text>
                </Link>
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>
    </Container>
  );
}
const Container = styled.div`
  height: 75vh;
  width: 100vw;
  background-color: #4293ad;
  overflow: hidden;
  .locationIcon{
    fill: ${props => props.theme.logo};
    stroke: ${props => props.theme.body};
    stroke-width: 2px;
  }
`;
