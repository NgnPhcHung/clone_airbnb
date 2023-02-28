import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { GoSearch } from 'react-icons/go'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import useWindowSize from '../../Hook/useWindowSize'
import { modalAction } from '../../Redux/Action/modalAction'
import BeatLoader from "react-spinners/BeatLoader";

const SearchBox = () =>{
  const dispatch = useDispatch()
  const [width, ] = useWindowSize()
  const openModalNav = () => dispatch(modalAction.openNavbar())


  return width >= 740? (
    <Container onClick={openModalNav}>
      <p>Start your search</p>
      <GoSearch className='icon'/>
    </Container>
  ):
  <Link to='/'>
    <Mobile><IoIosArrowBack/><p>  Homes </p></Mobile>
  </Link> 
}

export default function StartSearchBox() {
  const [loading, setLoading] = useState(true)

  useEffect(() =>{
    const delayRender = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(delayRender)
  },[])
  return loading? <Container loading={true.toString()}><BeatLoader color='#202020' size={10}/></Container> : <SearchBox/>
}

const Container = styled.div`
  width: 15rem;
  height: 3rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;  
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: ${props => props.loading? 'center' : 'space-between'};
  border: 1px solid ${props => `rgba(${props.theme.textRgba}, 0.1)`};
  border-radius: 40px;
  padding: 0 1rem;
  font-weight: bold;
  .icon{
    padding: 0.4rem;
    border-radius: 50%;
    background-color: ${props => props.theme.logo};
    color: ${props => props.theme.body};
  }

  &:hover{
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`
const Mobile = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`