import React from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { HiOutlineAdjustmentsHorizontal,  } from 'react-icons/hi2'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

export default function SmallSearch(props) {
  const onClick = () =>{
    props.onClick()
  }

  return (
    <Container
      onClick={onClick}
    >
       <HiOutlineSearch className='icon'/>
        <div className="texts">
          <p>Anywhere</p>
          <span>
            Anyweek • Add Guests
          </span>
        </div>
        <HiOutlineAdjustmentsHorizontal  className='searchfilter'/>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 57%;
  display: flex;
  cursor: pointer;
  padding: 0 0.7rem;
  border-radius: 40px;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border: 1px solid ${props => props.theme.gray};
  background-color: ${props => props.theme.body};
  position: relative;
  .texts{
    margin-left: 15px;
  }
  p{
    font-weight: bold;
  }
  .texts span{
    font-size: ${props => props.theme.fontsm};
    color: ${props => `rgba(${props.theme.textRgba}, 0.6)`}
  }

  .searchfilter{
    position: absolute;
    right: 3%;
    padding: 0.5rem;
    border: 1px solid ${props => `rgba(${props.theme.textRgba}, 0.2)`};
    border-radius: 50%;
    font-weight: bold;
  }
`
