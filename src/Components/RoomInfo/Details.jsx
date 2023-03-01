import { LoremIpsum } from 'lorem-ipsum';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AvatarGenerator } from 'random-avatar-generator';
import { reviewsArr } from './randomReview';
import Skeleton from 'react-loading-skeleton';
import { TbChevronRight } from 'react-icons/tb';
import CheckInOut from '../../Section/RoomInfo/CheckInOut';
import MapChart from './MapChart';

const SkeletonComponent = () =>{
  return <Container>
  <Owner>
    <div className='own'>
      <h3> <Skeleton/> </h3>
      <div className="houseDetails">
        <p><Skeleton  width={60}/></p>
        <p><Skeleton width={60}/></p>
        <p><Skeleton width={60}/></p>
        <p><Skeleton width={60}/></p>
      </div>
    </div>
    <Skeleton className='avata'/>
  </Owner>
  <Review>
    {
      Array(3).fill().map((v, i) => <div key={i} className='reviewWrapper'>
      <Skeleton width={30} height={30} />
      <p className="title"><Skeleton  width={100}/></p>
      <p className='description'><Skeleton  width={150}/></p>
    </div>)
    }
  </Review>
  <Cover>
    <div className="coverText"><Skeleton width={100} height={30}/></div>
    <div className="coverText"><Skeleton width={'100%'} height={50}/></div>
    <p><Skeleton width={60} height={30}/> </p>
  </Cover>
  <Cover>
    <div className="coverText"><Skeleton width={'100%'} height={100}/></div>
    <p><Skeleton width={60} height={30}/> </p>
  </Cover>
  <Offers>
    <h2><Skeleton  width={'50%'} height={50}/></h2>
    <div className="offersWrapper">
    {
      Array(4).fill().map((v, i) => <div key={i} className='offers'>
      <Skeleton width={20} height={20} />
      <p className="title"><Skeleton width={150}/></p>
    </div>)
    }
    </div>
  </Offers>
</Container>
}

export default function Details() {

  const [loading, setLoading] = useState(true)
  const lorem = new LoremIpsum({
    wordsPerSentence: {
      max: 7,
      min: 4
    }
  });
  const [reviews, setReviews] = useState([])
  const [offers, setOffers] = useState([])
  const [owner, setOwner] = useState({own: '',avata: '', guests: 0, bedRoom: 0, bed: 0, privateBath: 0})
  const randomItem =()=> {
    return  reviewsArr[Math.floor(Math.random()*reviewsArr.length)];
  }
  useEffect(() =>{
    const generator = new AvatarGenerator();

    const settingOwner = () =>{
      const own = lorem.generateSentences(1)
      const avata = generator.generateRandomAvatar();
      const guests =  Math.floor(Math.random() * 10);
      const bedRoom =  Math.floor(Math.random() * 5);
      const bed =  Math.floor(Math.random() * 8);
      const privateBath =  Math.floor(Math.random() * 4);
      setOwner({own, avata,  guests, bedRoom, bed, privateBath})
    }
    const settingArr = (limit) =>{
      let count = 1
      let reviews = []
      while(count <=limit){
        // setReviews(old => [...old, randomItem()])
        reviews.push(randomItem())
        count++
      }
      return reviews.filter((value, index, array) => array.indexOf(value) === index);
    }
    settingOwner()
    setReviews(settingArr(4))
    setOffers(settingArr(8))
    const delayRender = setTimeout(() => {
      setLoading(false)
    }, 2200)
    return () => clearTimeout(delayRender)
  },[])

  return loading? 
    <SkeletonComponent/>: (
    <Container >
      <Owner id='info'>
        <div className='own'>
          <h3>{owner.own}</h3>
          <div className="houseDetails">
            <p>{owner.guests} guests</p>
            <p>{owner.bedRoom} bedrooms</p>
            <p>{owner.bed} bed</p>
            <p>{owner.privateBath} private bath</p>
          </div>
        </div>
        <img src={owner.avata} alt ='ava' className='avata'/>
      </Owner>
      <Review>
        {
          reviews.map((re, i) =><div key={i} className='reviewWrapper'>
            <re.icon className='rIcon' />
            <p className="title">{re.title}</p>
            <p className='description'>{re.description}</p>
          </div>)
        }
      </Review>
      <Cover>
        <div className='cover'><div className="pink">air</div>cover</div >
        <div className="coverText">{lorem.generateSentences(5)}..</div>
        <p>Learn more</p>
      </Cover>
      <Cover>
        <div className="coverText">{lorem.generateSentences(10)}.. :)</div>
        <p>Show more <TbChevronRight/></p>
      </Cover>
      <Offers id='offers' >
        <h2 >What this place offers</h2>
        <div className="offersWrapper">
          {
          offers.map((re, i) =><div key={i} className='offers'>
            <re.icon className='rIcon' />
            <p className="title">{re.title}</p>
          </div>)
          }
        </div>
      </Offers>
      <CheckInOut/>
      <MapChart/>
    </Container>
  )
}
const Container = styled.div`
  width: 70%;
  height: 100%;
  display: block;
  margin-top: 1rem;
  @media (max-width: 740px){
    width: 95%;
  }
`
const Owner = styled.div`
  padding: 1rem auto;
  display: grid;
  grid-template-columns: repeat(2, minmax(min(30rem, 100%), 1fr));
  position: relative;
  width: max-content;
  height: 5rem;
  &::after{
    content: '';
    width: 70%;
    height: 1px;
    background-color: ${props=> props.theme.gray};
    position: absolute;
    bottom: -0.4rem;
  }

  & .avata{
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
  }
  .own{
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .houseDetails { 
    display: flex;
    align-items: center;
  }
  .houseDetails p{
    color: ${props => `rgba(${props.theme.textRgba}, 0.5)`};
    position: relative;
    font-size: ${props => props.theme.fontmd};
    padding: 0;
  }
  .houseDetails p:not(:first-child){
    margin:auto 1rem;
  }
  .houseDetails p:not(:last-child)::after{
    position: absolute;
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    top: 50%;
    right: -15%;
    background-color: ${props => `rgba(${props.theme.textRgba},0.6)`};
  }
`
const Review = styled.div`
  margin-top: 1rem;
  width: 60%;
  font-size: ${props => props.theme.fontmd};
  position: relative;

  &::after{
    content: '';
    width: 70%;
    height: 1px;
    background-color: ${props=> props.theme.gray};
    position: absolute;
    bottom: -0.4rem;
  }
  .reviewWrapper{
    margin: 1rem auto;
    display: grid;
    grid-template-columns: 3rem auto;
  }
  .title{
    align-items: center;
    font-size: ${props => props.theme.fontsm};
    font-weight: bold;
  }
  
  .rIcon{
    margin-right: 10px;
    font-size: ${props => props.theme.fontxl};
  }
  .description{
    color: ${props => `rgba(${ props.theme.textRgba}, 0.8)`};
    font-size: ${props => props.theme.fontxs};
    grid-column: 2/3
  }
`
const Cover = styled.div`
  margin-top: 1rem;
  width: 80%;
  position: relative;
  &::after{
    content: '';
    width: 70%;
    height: 1px;
    background-color: ${props=> props.theme.gray};
    position: absolute;
    bottom: -0.4rem;
  }
  .cover{
    display: flex;
    font-size: ${props=> props.theme.fontxl};
    padding-bottom: 1rem;
  }
  .cover .pink {
    color :${props => props.theme.logo};
    font-weight: bold;
  }
  & p{
    display: flex;
    align-items: flex-end;
    padding-top: 1rem;
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
  }
`
const Offers = styled.div`
  margin-top: 3rem;
  /* padding: 1rem auto; */
  width: 100%;
  position: relative;
  &::after{
    content: '';
    width: 70%;
    height: 1px;
    background-color: ${props=> props.theme.gray};
    position: absolute;
    bottom: -0.4rem;
  }
  .offersWrapper{
    display: grid;
    width: 80%;
    grid-template-columns: repeat(2, minmax(min(22rem, 100%), 1fr));
    grid-gap:5px 10px;
    place-items: center stretch;
  }
  .offers{
    margin: 1rem auto;
    display: grid;
    grid-template-columns: 3rem auto;
    width: 100%;
  }
  .title{
    align-items: center;
    font-size: ${props => props.theme.fontsm};
    font-weight: bold;
  }
  
`