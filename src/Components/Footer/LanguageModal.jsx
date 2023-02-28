import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { modalAction } from '../../Redux/Action/modalAction';
import ModalTemplates from './ModalTemplate';
import {countries} from './countryData'

const Card = ({data}) =>{
  return data.lang_name &&(
    <CardWrapper >
      <p  className="name">{data.lang_name}</p>
      <p className="currency ">{data.country_name}</p>
    </CardWrapper>
  )
}

export default function LanguageModal() {
  const dispatch = useDispatch()
  const toggleModal = () =>{
    dispatch(modalAction.toggleLanguage())
  }
  return (
    <ModalTemplates toggleModal={toggleModal} >
      <Content>
        <Translator>
          <div className="content">
            <h3>Translation</h3>
            <p>Automatically translate descriptions and reviews to English.</p>
          </div>
          <label className="switch">
            <input type="checkbox"/>
            <span className="slider round"></span>
          </label>
        </Translator>
        <Suggest>
          <h2>Suggested languages and regions</h2>
          <div className="content">
            <Card
              data={{country_name: 'Việt Nam', lang_name:'Tiếng Việt'}}
            />
            <Card
              data={{country_name: 'United Kingdom', lang_name:'English'}}
            />
            <Card
              data={{country_name: 'Danmark', lang_name:'Dansk'}}
            />
          </div>
        </Suggest>      
        <h2>Choose a language and region</h2>
        <div className="mapper">
        {
          countries.map((v, i) =><Card key={i} data={v}/>)
        }
        </div>
      </Content>
    </ModalTemplates>
  )
}
const Content = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 1rem;
  height: 98%;

  .mapper{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    grid-auto-rows: min-content;
    grid-gap: 10px;
    padding-bottom: 2rem;
  }
`
const Suggest = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  h2{
    margin-bottom: 10px;
  }
  .content{
    display: flex;
    align-items: center;
  }
`
const CardWrapper = styled.button`
  background-color  : transparent ;
  border: none;
  padding:  0.5rem 1rem;
  height: 4rem;
  width:10rem;
  text-transform: capitalize;
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
const Translator = styled.div`
  display: flex;
  margin: 1rem 0;

  .content{
    h3,p{
    color :${props => `rgba(${props.theme.textRgba}, 0.6)`};
    }
  }
  .switch{
    position: relative;
    display: inline-block;
    width: 60px;
    height: 30px;
  }
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 5%;
    right: 0;
    bottom: 0;
    background-color: ${props => props.theme.gray};
    border-radius: 40px;
    -webkit-transition: .4s;
    transition: all .4s;
  }
  .slider::before{
    position: absolute;
    content: "";
    width: 30px;
    height: 30px;
    background-color: ${props => props.theme.body};
    border-radius: 40px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    left: 0;
    transition: all .4s;
  }

  .switch input:checked +.slider  {
    background-color: ${props => props.theme.text};
  }

  .switch input:checked + .slider::before{
    transform: translateX(30px);
  }
@media (max-width: 740px){
  ${CardWrapper}{
    width: 100%;
  }
  .switch{
    width: 50px;
    height: 20px;
  }
  .slider::before{
    position: absolute;
    content: "";
    width: 20px;
    height: 20px;
  }
  .switch input:checked + .slider::before{
    transform: translateX(15px);
  }

}
`