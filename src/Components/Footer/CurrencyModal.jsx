import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useOnClickOutside } from '../../Hook/useClickOutside';
import { modalAction } from '../../Redux/Action/modalAction';
import ModalTemplates from './ModalTemplate';
import { currencies } from 'currencies.json';

const Card = ({data}) =>{
  return (
    <CardWrapper>
      <div  className="name">{data.name}</div>
      <div className="currency ">{data.code} - {data.symbol}</div>
    </CardWrapper>
  )
}


export default function CurrencyModal() {
  const ref= useRef(null)
  const dispatch = useDispatch()
  const toggleModal = () =>{
    dispatch(modalAction.toggleCurrency())
  }
  useOnClickOutside(ref, () => dispatch(modalAction.toggleCurrency()))

  return (
    <ModalTemplates toggleModal = {toggleModal} >
      <h2>Choose a currency</h2>
      <Content>
        {
          currencies.map((cur, i) => <Card key={i} data={cur}/>)
        }
      </Content>
    </ModalTemplates>
  )
}
const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-auto-rows: min-content;
  grid-gap: 1rem;
  overflow-x: hidden;
  overflow-y: auto;
  height: fit-content;
  padding-bottom: 2rem;
  height: 85%;
  @media (max-width: 740px){
    height: 80vh;
    overflow-y: scroll;
  }
`
const CardWrapper = styled.button`
  background-color  : transparent ;
  border: none;
  padding:  0.5rem 1rem;
  height: 4rem;
  width: 10rem;
  
  text-align: left;
  border-radius: 5px;
  cursor: pointer;

  &:hover{
    background-color: ${props => `rgba(${props.theme.textRgba},0.07)`};
  }
  .name{
    font-size: ${props => props.theme.fontmd};
  }
  .currency{
    color: ${props => `rgba(${props.theme.textRgba},0.6)`};
    font-size: ${props => props.theme.fontmd};
  }
`