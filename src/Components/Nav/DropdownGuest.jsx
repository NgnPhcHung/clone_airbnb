import React, { useState } from 'react'
import styled from 'styled-components'
import useWindowSize from '../../Hook/useWindowSize'
import { BiPlus, BiMinus } from 'react-icons/bi'

export default function DropdownGuest() {
  const [width, ] = useWindowSize()
  const [guests, setGuests] = useState([
    {
      id: 0,
      title: 'Adults',
      description: 'Ages about 13 or above',
      quantity: 0
    },
    {
      id: 1,
      title: 'Children',
      description: 'Ages 2-12',
      quantity: 0
    },
    {
      id: 2,
      title: 'Infrants',
      description: 'Under 2',
      quantity: 0
    },
    {
      id: 3,
      title: 'Pet',
      description: 'Bringing a service animal?',
      quantity: 0
    },
  ])

  return (
    <Container>
      <Title  >
        {width <= 740 ?<p>Who's coming?</p> : ''}
      </Title>
      <SearchContainer >
        {
          guests.map((guest, i) =>(
            <AddCard key={i}>
              <p>{guest.description}</p>
              <div className="buttonGroup">
                <BiMinus className='operator' />
                <span role='textbox' className='text'>{guest.quantity}</span>
                <BiPlus className='operator'/>
              </div>
            </AddCard>
          ))
        }
      </SearchContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 21vw;
  align-items: center;
  justify-content: space-evenly;
  @media (max-width: 740px){
    width: 100%;
  }
`
const Title = styled.div`
  color: ${props => props.theme.text};
  padding: 0 2rem;
  height: 4rem;
  border-radius: 40px;
  cursor: pointer;
  position: relative;
  display: none;
  justify-content: center;

  p{
    font-size: ${props => props.theme.fontmd};
    font-weight: bold;
  }

  @media (max-width: 740px){
    display: 'grid'
  }
`
const SearchContainer= styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width:  90%;
  font-size: ${props => props.theme.fontsm};

`
const AddCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.5rem;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  .buttonGroup{
    display: inline-grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: auto auto auto;
  }
  .buttonGroup p{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .buttonGroup span{
    margin: 0 15px;
  }
  .buttonGroup .operator{
    padding: 0.5rem;
    border-radius: 40px;
    border: 1px solid ${props => `rgba(${props.theme.textRgba}, 0.3)`};
  }
`