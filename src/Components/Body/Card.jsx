import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createClient } from 'pexels';
import { LoremIpsum } from "lorem-ipsum";
import moment from "moment/moment";
import {BsFillStarFill, BsFillHeartFill} from 'react-icons/bs'
import { Link } from 'react-router-dom';

export default function Card({id}) {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [card, setCard] = useState({image: [], title: '', rating: 0, distance: 0, from: '', to: '', price: 0})
  
  useEffect(() =>{
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
    const randomDate = () =>{
      var startDate = new Date(2012,0,1).getTime();
      var endDate =  new Date(2015,0,1).getTime();
      var spaces = (endDate - startDate);
      var timestamp = Math.round(Math.random() * spaces);
      timestamp += startDate;
      return new Date(timestamp);
    }
    const formatDate = (date) =>{
      var month = randomDate().getMonth();
      var day = randomDate().getDate();
  
      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;
      let dateString =  String(date.getFullYear()) + month + day;
      let a = moment(dateString, 'YYYYMMDD')
  
      return a.format('MMM Do') 
    }
    const setInfo = (img) =>{
      const title = lorem.generateSentences(1)
        const rating = Math.floor(Math.random() * (5 * 100 - 1 * 100) + 1 * 100) / (1 * 100)
        const distance = Math.floor(Math.random() * 1000000).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
        let from = formatDate(randomDate())
        while(from === 'Invalid date'){
          from = formatDate(randomDate())
        }
        let to = formatDate(randomDate()) 
        while(to === 'Invalid date'){
          to = formatDate(randomDate()) 
        }
        const price = Math.floor(Math.random() * 1000)
        setCard({image: img.src.medium, title, rating, distance, from, to, price})
    }
    const client = createClient('R1uHcrabd1rm4zaMFGBGRBF2IeF1yPK2JTobJ1AfK5MWDParzrMptrn8');
    setLoading(true)
    const getCardPhotos = async () =>{
      if(id){
        await client.collections.media({ id, type:'photos', per_page: 10 }).then( media => {
          media.media && media.media.map(img =>{
            if(img.type === 'Photo'){
              img.src.medium && setImages(oldData => [...oldData, img.src.medium])
              if(img.src.medium){
                setInfo(img)
                setLoading(false)
              }
            } 
          })
        }).catch((err)  => {
          
        });
      }
    }
    getCardPhotos()
  },[id, loading])

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
  };
  return !loading&&(
    <CardContainer>
      <Link to={`/room/${id}`} target="_blank" rel="noopener noreferrer">
        <Heart>
          <BsFillHeartFill className='heart' />
        </Heart>
        <SliderWrapper>
          <Slider {...settings} infinite={false}>
            {
              images.map((img, i) => {
                return (
                  <img src={img} alt="" key={i}/>
                )
              })
            }
          </Slider>
        </SliderWrapper>
        <div className="title">
          <div className="name">{card.title}</div>
          <div className="stars">{card.rating}<BsFillStarFill/></div>
        </div>
        <div className="body">
          <div className="distance">{card.distance} kilometers aways</div>
          <div className="day">{card.from}-{card.to}</div>
        </div>
        <div className="price">
          <p>${card.price}</p> night
        </div>
      </Link>
    </CardContainer>
  )
}
const CardContainer = styled.div`
  overflow: hidden;
  min-height: 25rem;
  min-width: 20rem;
  position: relative;

  .slick-slider{
    min-width: 20rem;
  }

  img{
    border-radius: 20px;
    width: 100%; /* This if for the object-fit */
    height: 20rem; /* This if for the object-fit */
    object-fit: cover; 
    object-position: center;
  }
  .title{
    display: flex;
    justify-content: space-between;
  }
  .title .name{
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
    margin-right: 20px;
    font-weight: bold;
  }
  .title .stars{
    display: inline-grid;
    grid-template-columns: auto auto;
  }

  .body{
    color: ${props => `rgba(${props.theme.textRgba},0.7)`}
  }
  .body .distance{}
  .body .day{}
  
  .price{
    display: flex;
  }
  .price p{
    font-weight: bold;
    margin-right: 5px;
  }
  .slick-arrow{
    z-index: 2;
    opacity: 0;
    display: none;
  }
  .slick-prev{
    left: 20px;
  }
  .slick-next{
    right: 20px;
  }
 

  &:hover .slick-arrow {
    opacity: 1;
    display: block;
  }
`
const SliderWrapper = styled.div`
  width: 100%;
`
const Heart = styled.button`
  position: absolute;
  right: 5px;
  top: 5%;
  right: 5%;
  border: none;
  outline: none;
  width: fit-content;
  height: fit-content;
  background-color: transparent;
  cursor: pointer;
  z-index: 5;

  .heart{
    fill: ${props => `rgba(${props.theme.textRgba}, 0.4)`};
    font-size: ${props => props.theme.fontxl};
    z-index: 5;
  }
  &:hover .heart{
    fill: ${props => `rgba(${props.theme.textRgba}, 0.6)`};
  }
`