import { createClient } from 'pexels'
import React, { useEffect, useState } from 'react'
import { CgMenuGridO } from 'react-icons/cg'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useDispatch } from 'react-redux'
import { modalAction } from '../../Redux/Action/modalAction'
import Slider from 'react-slick'
import useWindowSize from '../../Hook/useWindowSize'

export default function ImagesIntro() {
  const {roomId} = useParams()
  const dispatch = useDispatch()
  const [width,  ] =useWindowSize()
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [slide, setSlide] = useState({
    slideIndex: 0,
    updateCount: 0
  })
  const showModal = () => dispatch(modalAction.toggleShowAllImg())
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    afterChange: (changeInd) => {
      setSlide(() => ({ updateCount: changeInd }))
    },
    beforeChange: (current, next) => {
      setSlide({ slideIndex: next })
    }
  };
  useEffect(() => {
    const client = createClient('R1uHcrabd1rm4zaMFGBGRBF2IeF1yPK2JTobJ1AfK5MWDParzrMptrn8');
    const getPhotos = () =>{
      client.collections.media({ id:roomId, per_page: 20 }).then(media => {
        media.media.map(img =>{
          if(images.length > 5 || img.type !== 'Photo') return null
          else{
            img.src.medium && setImages(oldData => [...oldData, img.src.medium])
            setLoading(false)
          }
        })
      })
    }
    const delayRender = setTimeout(() => {
      getPhotos()
    }, 2000)
    return () => clearTimeout(delayRender)
  },[images.length, loading, roomId])

  const ImageViewer = () =>{
    if(width >= 740 ) {
      return (
        <ImgContainer onClick={showModal}>
        {
          images.map((img, i) =>{
            if(i<5) {
              return <Card src={img} alt="" key={i}/>
            }
            return null
          })
        }
        <ShowAll>
          <CgMenuGridO className='menu'/>
          <p>show all photos</p>
        </ShowAll>
      </ImgContainer>
      )
    }
    else{
      return (
        <Wrapper onClick={showModal}>
          <Slider {...settings} infinite={false}>
            {
              images.map((img, i) => {
                return (
                  <Card src={img} alt="" key={i}/>
                )
              })
            }
          </Slider>
          <div className="sliderNum">
            <p>{slide.updateCount+1}/{images.length +1}</p>
          </div>
        </Wrapper>
      )
    }
  }

  return loading ?
  <div
    style={{
      borderRadius:'40px',
      display: 'block',
      lineHeight: 2,
      padding: '1rem',
      marginBottom: '0.5rem',
      width: '100%',
      height: '25rem'
      }}
    >
    <Skeleton 
      height={'100%'}
    />
  </div>
  : ImageViewer()
}

const ImgContainer = styled.div`
  display: grid;  
  grid-template-columns: 2fr 1fr 1fr;
  grid-gap: 10px;
  grid-row-gap: 15px;
  justify-content: center;
  height: fit-content;
  border-radius: 20px;
  overflow: hidden;
`
const Card = styled.img`  
  width: 100%; 
  height: 12rem; 
  position: relative;
  transition: all 0.5s ease;
  cursor: pointer;

  &:hover{
    filter: brightness(90%);
  }
  &:first-child {
    height: 25rem; 
    grid-row: span 2;
  }
  @media (max-width: 740px){}
`
const ShowAll = styled.button`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0.3rem;
  width: 12rem;
  height: 2.3rem;
  border-radius: 10px;
  text-transform: capitalize;
  font-weight: bold;
  background-color: ${props => props.theme.body};
  border: 1px solid ${props => `rgba(${props.theme.textRgba},0.6)`};
  position: absolute;
  bottom: 5%;
  right: 5%;
  cursor: pointer;
  &:hover{
    background-color: ${props => `rgba(${props.theme.bodyRgba}, 0.9)`};
  }
  .menu{
    font-size: ${props => props.theme.fontlg};
  }
  @media (max-width: 740px){
    display: none;
  }
`
const Wrapper = styled.div`
  width: 98vw;
  height: max-content;
  position: relative;
  border-radius: 2px;

  .sliderNum{
    position: absolute;
    right: 5%;
    bottom: 10%;
    background-color: ${props => `rgba(${props.theme.textRgba}, 0.6)`};
    color: ${props => props.theme.body};
    padding: 0 0.5rem;
    border-radius: 5px;

  }
`