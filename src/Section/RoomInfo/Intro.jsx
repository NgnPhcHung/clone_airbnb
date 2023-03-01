import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Nav from '../../Components/Nav'
import StartSearchBox from '../../Components/Nav/StartSearchBox'
import { LoremIpsum } from "lorem-ipsum";
import ImagesIntro from '../../Components/RoomInfo/ImagesIntro';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import useWindowSize from '../../Hook/useWindowSize';

function MobileIntro ({loading, title}) {
  return <Container>
  <ImagesIntro/>
  {
  loading? 
    <SkeletonLoading>
      <Skeleton count={1} height={50} className='first'/>
      <Skeleton width={150} height={30} count={1}/>
    </SkeletonLoading>:
    <Title>
      <h2>{title.title}</h2>
      <p>{title.loca}</p>
    </Title>
  }
</Container>
}
export default function Intro() {
  const [width,  ] = useWindowSize()
  const [title, setTitle] = useState({title:'', loca: ''}) 
  const [loading, setLoading] = useState(true)
  useEffect(() =>{
    const componentInfo = () =>{
      const lorem = new LoremIpsum({
        wordsPerSentence: {
          max: 7,
          min: 4
        }
      });
      const title = lorem.generateSentences(1)
      const loca = lorem.generateWords(10);
      setTitle({title, loca})
      document.title = title
    }
    const delayRender = setTimeout(() => {
      componentInfo()
      setLoading(false)
    }, 2000)
    return () => clearTimeout(delayRender)
  },[])

  return width > 740 ? (
    <Container id='photo' >
      {
      loading? 
        <SkeletonLoading>
          <Skeleton count={1} height={50} className='first'/>
          <Skeleton width={150} height={30} count={1}/>
        </SkeletonLoading>:
        <Title>
        <h2>{title.title}</h2>
        <p>{title.loca}</p>
        </Title>
      }
      <ImagesIntro/>
    </Container>
  ): <MobileIntro title={title} loading={loading} />
}

const Container= styled.div`
  height: fit-content;
  width: calc(100% - 25vw);
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex-wrap: nowrap;
  @media (max-width: 740px){
    width: calc(100% - 5vw);
  }
`
const Title = styled.div`
  width: 100%;
  height: 5rem;
  text-align: left;

  h2{
    font-weight: 500;
    font-size: ${props => props.theme.fontxl};
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
  }
  p{
    font-weight: bold;
    text-decoration: underline;
    text-transform: capitalize;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
  }

  @media (max-width: 960px){
    h2{
      font-size: ${props => props.theme.fontlg};
    }
    p{
      font-size: ${props => props.theme.fontmd};
    }
  }
  @media (max-width: 740px){
    height: fit-content;
  }
`
const SkeletonLoading = styled.div`
  height: 5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .first{
    width: 70%;    
  }
`
