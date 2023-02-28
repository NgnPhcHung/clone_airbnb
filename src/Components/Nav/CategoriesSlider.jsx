import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { categories } from './categories';
import useWindowSize from '../../Hook/useWindowSize';

function NextArrow(props) {
  const { className, onClick } = props;
  return <ArrowNext className={className} onClick={onClick} />;
}
function PrevArrow(props) {
  const { className, onClick } = props;
  return (
    <ArrowPrev
      className={className}
      onClick={onClick}
    />
  );
}

export default function CategoriesSlider() {
  const [showOption, setShowOption] = useState(8)
  const settings = {
    speed: 500,
    slidesToShow:showOption,
    slidesToScroll: showOption-1,
    arrows: true,
    dots: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  const [width, ] = useWindowSize()
  
  useEffect(() =>{
    if(width < 940) {
      return setShowOption(6)
    }setShowOption(8)
  },[width])
  
  return (
    <Container>
      <div className="content">
        <Slider {...settings}
          infinite = {false}
        >
          {
            categories.map((e, i) =>{
              return (
              <Card key={i} >
                <e.icon className="child icon"/>
                <p className="child" >{e.title}</p>
              </Card>
              )
            })
          }
        </Slider>
      </div>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  grid-column: 1/4;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .content{
    width: 65%;
    height: 100%;
  }
  .slick-arrow{
    cursor: pointer;
    transition: font-size 150ms ease-in;
  }
  .slick-disabled {
    display: none;
  }

  .slick-prev{
    left: -25px;
  }
  .slick-next{
    right: -30px;
  }
  .slick-prev, .slick-next{
    width: 1.3rem;
    height: 1.3rem;
  }
  .slick-prev:before{
    content: "❮";
    font-size: 2vw;
    color: ${props => `rgba(${props.theme.textRgba},0.7)`};
  }
  .slick-next:before{
    content: '❯';
    font-size: 2vw;
    color: ${props => `rgba(${props.theme.textRgba},0.7)`};
  }
`
const Card = styled.div`
  max-width: fit-content;
  height: 4rem;
  display: flex !important;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  border: none;
  cursor: pointer;

  &:active::before{
    font-weight: bold;
  }
  &:focus::before{
    font-weight: bold;
  }
  :target .child{
    font-weight: bold;
  }

  &::before{
    content: '';
    width: 100%;
    height: 0px;
    position: absolute;
    background-color: ${props => `rgba(${props.theme.textRgba},0.2)`};
    left: 0;
    bottom: 0;
    transition: height 100ms ease;
  }
  &:hover::before{
    height: 2px;
  }

  .child{
    color: ${props => `rgba(${props.theme.textRgba},0.7)`};
  }

  .child.icon{
    font-size: ${props => props.theme.fontxl};
  }
  .child ~ p{
    font-size: ${props => props.theme.fontsm};
    font-weight: bold;
  }
`
const ArrowNext = styled.div`
  display: block;
  border-radius: 50%;
`;
const ArrowPrev = styled.div`
  display: block;
  border-radius: 50%;
`;
