import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { modalAction } from '../../Redux/Action/modalAction'
import { IoIosArrowBack } from 'react-icons/io'
import {BsHeart, BsUpload} from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { createClient } from 'pexels'
import ImageSliderModal from './ImageSliderModal'

export default function ShowImageModal() {
  const {roomId} = useParams()
  const dispatch = useDispatch()
  const [images, setImages] = useState([])
  const [clickIndex, setClickIndex] = useState()
  const [showSlider, setShowSlider]= useState(false)
  const close  = () => dispatch(modalAction.toggleShowAllImg())

  useEffect(() =>{
    const client = createClient('R1uHcrabd1rm4zaMFGBGRBF2IeF1yPK2JTobJ1AfK5MWDParzrMptrn8');

    const getPhotos = () =>{
      client.collections.media({ id:roomId, per_page: 50 }).then(media => {
        media.media.map(img =>{
          if(img.type !== 'Photo') return null
          return img.src.large && setImages(oldData => [...oldData, img.src.large])
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
  const toggleSlider = (ind) => {
    setShowSlider(!showSlider)
    setClickIndex(ind)
  }
  
  return (
    <Container
      initial={{
        opacity: 0,
        transform: 'translateY(101vh)'
      }}
      animate={{
        opacity: [0.5, 1],
        transform: 'translateY(0vh)'
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
        <IoIosArrowBack className='iconX' onClick={close}/>
        <div className='right'>
          <div className='content' ><BsHeart className='rIcon'/>Save</div>
          <div className='content' ><BsUpload className='rIcon'/>Share</div>
        </div>
      </Header>
      <div className="imgGrid">
        {images.map((img, i) => <img key ={i} src={img} alt="" onClick={() => toggleSlider(i)} />)}
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        { showSlider&& <ImageSliderModal onClick={() => setShowSlider(!showSlider)} index ={clickIndex}  />}
      </AnimatePresence>
    </Container>
  )
}

const Container = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(auto,1fr));
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.body};
  z-index: 1001;

  .imgGrid{
    grid-column: 2/3 ;
    margin-top: 1rem;
    height: 100%;
    /* width: 100%; */
    display: grid;
    grid-template-columns: repeat(2, minmax(0, max-content));
    place-items: center !important;
    gap: 8px !important;
    grid-row-gap: 0.7rem;
    overflow-y: auto;
  }
  .imgGrid img{
    width: 22.5rem;
    height: 15rem;
    object-fit: cover;
    vertical-align: bottom;
    transition: all 0.5s ease;
    cursor: pointer;
  }
  .imgGrid img:nth-child(3n-2){
    grid-column: span 2;
    width: 46em;
    height: 30rem;
  }  
  & .imgGrid img:hover{
    filter: brightness(90%);
  }

  @media (max-width: 960px){
    .imgGrid{
      grid-column: 1/2;
    }
    .imgGrid img{
      width: 98%;
    }
    .imgGrid img:nth-child(3n-2){
      grid-column: span 2;
      width: 98%;
      height: 30rem;
    }
  }
  @media (max-width: 740px){

  }
`
const Header = styled.div`
  grid-column: 1/3 ;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .iconX{
    top: 2%;
    left: 2%;
    font-size: ${props => props.theme.fontxl};
    cursor: pointer;
  }
  .iconX:hover{
    color: ${props => `rgba(${props.theme.textRgba}, 0.8)`}
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
    color: ${props => `rgba(${props.theme.textRgba},0.8)`};
    cursor: pointer;
    padding: 0.3rem;
    border-radius: 10px;   
    margin-left: 10px; 
  }
  .content:hover{
    color: ${props => props.theme.text};
    background-color: ${props => `rgba(${props.theme.textRgba}, 0.06)`};
  }

  @media (max-width: 960px){
    grid-column: 1/2 ;
    .content{
      margin-left: 0; 
    }
  }
  @media (max-width: 740px){
    grid-column: 1
  }
`