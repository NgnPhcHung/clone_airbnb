import React from 'react'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'

export default function SkeletonCard() {
  return (
  <Card>
    <Skeleton className="upper"/>
    <div className="under">
      <Skeleton className='text' width={'100%'}/>
      <Skeleton className='text' width={200}/>
      <Skeleton className='text' width={100}/>
      <Skeleton className='text' width={100}/>
    </div>
  </Card>
  )
}

const Container  = styled.div`
  height: fit-content;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-auto-rows: min-content;
  grid-gap: 1rem;
`
const Card = styled.div`
  .upper{
    width: 100%;
    height: 13rem;
  }
  .under{
    width: 100%;
    margin-top: 10px;
  }
  .under .text{
    height: 2rem
  }
`