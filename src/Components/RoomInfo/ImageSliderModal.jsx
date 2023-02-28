import { motion } from 'framer-motion'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import styled from 'styled-components'
import { BsHeart, BsUpload, BsX }  from 'react-icons/bs'
import Slider from 'react-slick';
import { createClient } from 'pexels';
import { useParams } from 'react-router-dom';

export default function ImageSliderModal(props) {
 
  const {roomId} = useParams()
  const [images, setImages] = useState([])
  const [slide, setSlide] = useState({
    slideIndex: props.index,
    updateCount: props.index
  })

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: slide.slideIndex,
    afterChange: (changeInd) => {
      setSlide(() => ({ updateCount: changeInd }))
    },
    beforeChange: (current, next) => {
      setSlide({ slideIndex: next })
    }
  };
  useEffect(() =>{
    const client = createClient('R1uHcrabd1rm4zaMFGBGRBF2IeF1yPK2JTobJ1AfK5MWDParzrMptrn8');
    const getPhotos = () =>{
      client.collections.media({ id:roomId, per_page: 50 }).then(media => {
        media.media.map(img =>{
          if(img.type !== 'Photo') return null
          return img.src.landscape && setImages(oldData => [...oldData, img.src.landscape])
        })
      })
    }
    getPhotos()
  },[roomId])
  useLayoutEffect(() => {
    return () => {
        setImages([])
    }
  }, [])
  return (
    <BackDrop
      initial={{
        opacity: 0,
        transform: 'translateY(101vh)',
        backgroundColor: '#fff'
      }}
      animate={{
        opacity: [0.5, 1],
        transform: 'translateY(0vh)',
        backgroundColor: ['#fff', '#fff', '#fff', '#fff', '#202020']
      }}
      exit={{
        opacity: 0,
        transform: 'translateY(100vh)'
      }}
      transition={{
        duration: 0.4
      }}
    >
      <Header>
        <button className='btnX' onClick={() => props.onClick()} >
          <BsX className='icon'/>
          <p>Close</p>
        </button>
        <div className='counter'>
          <p >{slide.updateCount +1}/{images.length+ 1} </p>
        </div>
        <div className='right'>
          <div className='content' ><BsHeart className='rIcon'/></div>
          <div className='content' ><BsUpload className='rIcon'/></div>
        </div>
      </Header>
      {
        images && <Content>
        <Slider 
          {...settings}
        >
          {
            images.map((img, i) => <img src={img} key={i} alt='' />)
          }
        </Slider>
      </Content>
      }
    </BackDrop>
  )
}

const BackDrop = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.text};
  position: fixed;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  display: flex;
  flex-direction: column;
`
const Content = styled.div`
  width: 80vw;
  height: 60vh;

  img{
    width: auto;
    height: 60vh;
    object-fit: contain;
  }
  .slick-arrow:hover{
    background-color: ${props => `rgba(${props.theme.bodyRgba}, 0.5)`};
  }
  .slick-prev, .slick-next{
    width: 40px;
    height: 40px;
    border: 1px solid ${props => `rgba(${props.theme.bodyRgba}, 0.7)`};
    border-radius: 50%;
    background-color: transparent;
  }
  .slick-prev{
    left: -40px;
  }
  .slick-next{
    right: -40px;
  }
  .slick-prev::before, .slick-next::before{
    content: '';
    position: absolute;
    width: 3px;
    height: 10px;
    background-color: ${props => props.theme.body};
  }
  .slick-prev::after, .slick-next::after{
    content: '';
    position: absolute;
    width: 3px;
    height: 10px;
    background-color: ${props => props.theme.body};
    
  }
  .slick-prev::before{
    rotate: -45deg;
    border-radius: 40px;
    left: 35%;
    bottom: 30%;
  }
  .slick-prev::after{
    rotate: -135deg;
    border-radius: 40px;
    left: 35%;
    top: 30%;
  }
  .slick-next::before{
    rotate: 45deg;
    border-radius: 40px;
    right: 35%;
    bottom: 30%;
  }
  .slick-next::after{
    rotate: 135deg;
    border-radius: 40px;
    right: 35%;
    top: 30%;
  }
`
const Header = styled.div`
  height: 5rem;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  color : ${props => props.theme.body};
  font-size: ${props => props.theme.fontmd};
  
  .btnX{
    display: grid;
    grid-template-columns: auto auto;
    place-items: center;
    background-color: transparent;
    border: none;
    outline: none;
    padding: 0.5rem 0.7rem;
    border-radius: 10px;
    letter-spacing: 2px;
    cursor: pointer;
    color : ${props => props.theme.body};
    font-size: ${props => props.theme.fontmd};
  }
  .icon{
    font-size: ${props => props.theme.fontxl};
  }
  .btnX:hover{
    background-color: ${props => `rgba(${props.theme.bodyRgba},0.1)`};
  }
  .counter{
    font-size: ${props => props.theme.fontlg};
  }
  .right{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-weight: bold;
    text-decoration: underline;
    margin-right: 10px;
  }
  .rIcon{
    margin-right: 8px;
  }
  .content{
    display: flex;
    justify-content: center;
    align-items: flex-end;
    cursor: pointer;
    padding: 0.3rem;
    border-radius: 10px;   
    margin-left: 10px; 
  }
`
