import React from 'react'

import world from '../../assets/world.png'
import vietnam from '../../assets/vietnam.png'
import brazil from '../../assets/brazil.png'
import canada from '../../assets/canada.png'
import india from '../../assets/india.png'
import sweeden from '../../assets/sweeden.png'
import styled from 'styled-components'

const images = [
  {
    img: world,
    title: 'I’m flexible'
 },
 {
    img: brazil,
    title: 'Brazil'
  },
  {
    img: vietnam,
    title: 'Vietnam'
  },
  {
    img: canada,
    title: 'Cadana'
  },
  {
    img: india,
    title: 'India'
  },
  {
    img: sweeden,
    title: 'Sweeden'
  },
]
export default function DropdownDestination() {
  return (
    <Container>
      <label htmlFor="place">
        Search by region
      </label>
      <div className="region">
        {
          images.map((image, i) =>(
            <Card key={i} >
              <img alt={'picture of '+image.title} src={image.img}/>
              <p>{image.title}</p>
            </Card>
          ))
        }
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: inline-grid;
  flex-direction: column;
  height: fit-content;
  width: max-content;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  label {
    font-weight: bold;
    height: 3rem;
    width: 10rem;
    text-align: center;
  }
  .region{
    width: 100%;
    height: fit-content;
    overflow: hidden;
    display: inline-grid;
    grid-template-columns: auto auto auto ;
    justify-content: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 740px){
    overflow: hidden;

    label{
      display: none;
    }

    .region{
      display: flex;
      justify-content: center;
      overflow: auto;
    }
  }
`
const Card = styled.div`
  width: fit-content;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  padding: 0.2rem;

  p{
    font-weight: lighter;
    font-size: ${props => props.theme.fontmd};
  }
  img{
    background-size: cover;
    object-fit: cover;
    width: 7rem;
    height: 7rem;
    border-radius: 20px;
    border: 1px solid ${props => props.theme.gray}
  }
  img:hover{
    border: 1px solid ${props => props.theme.text};
  }
`