import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Card from '../../Components/Body/Card'
import { createClient } from 'pexels';
import SkeletonCard from '../../Components/Body/SkeletonCard';

export default function BodyDisplay() {
  const ref = useRef()
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const onScroll = () => {
    const current = ref.current;
    if (current) {
      const { scrollTop, clientHeight, scrollHeight } = current;
      const computedScrollHeight = Math.round(scrollTop) + clientHeight;
      if (
        scrollHeight >= computedScrollHeight - 1 &&
        scrollHeight <= computedScrollHeight + 1
      ) {
        setPage(page+1);
      }
      if(scrollTop === 0){}
    }
  };

  useEffect(() =>{
    const getCollectionId = () =>{
      const client = createClient('R1uHcrabd1rm4zaMFGBGRBF2IeF1yPK2JTobJ1AfK5MWDParzrMptrn8');
        client.collections.featured({ per_page: 7, page: page }).then(collections => {
        collections.collections.map((dt, ) =>{
          if(data.length <122){
            setData(oldData => [...oldData, dt.id])
            setLoading(false)
          }
        })
      });
    }
   
    getCollectionId()
    
  },[loading, page])


  return loading ? <SkeletonCard/>:(
    <Container ref={ref} onScroll={onScroll} >
      {
        data.map((id, i) =>(<Card key={i} id={id}/>))
      }
      {
        data.length<122 && Array(7).fill().map((v, i) => <SkeletonCard key={i} />)
      }
    </Container>
  )
}

const Container = styled.div`
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-auto-rows: min-content;
  grid-gap: 1rem;
  height: 100vh;
  width: calc(100vw - 10em);
  margin-top: 10px;
  margin-bottom: 10px;
  z-index: 1;
  overflow-y: scroll;
  padding-right: 7rem; 
  padding-left: 7rem; 
  box-sizing: content-box;
  margin-bottom: 4rem;

  @media (max-width: 740px){
    width: calc(100vw - 5em);
  }
`