import React, { useEffect, useRef, useState } from 'react'
import { GoSearch } from 'react-icons/go';
import styled from 'styled-components';
import { useOnClickOutside } from '../../Hook/useClickOutside';
import useWindowSize from '../../Hook/useWindowSize';

export default function ModalButtons(props) {
  const ref = useRef(null)
  const dropdownRef = useRef(null)
  const [isShowDropdown, setShowDropdown] = useState(false);
  useOnClickOutside(dropdownRef, () => setShowDropdown(false))
  const [width, ] = useWindowSize()

  const onClick = () =>{
    props.onClick(props.data.id)
    setShowDropdown(true)
  }

  useEffect(() =>{
    if(props.data.id === props.activeNum) return setShowDropdown(true)
    return setShowDropdown(false)
  },[props.activeNum, props.data.id])
  

  return (
    <ButtonContainer isShow={isShowDropdown} isone={props.data.id}>
      <div id={props.data.id} ref ={ref}className={`contain ${isShowDropdown? 'active': undefined}`}  onClick={onClick}>
        <label>{props.data.title}</label>
        {
          width <=740 ? props.data.id===1? <input autoComplete='off' type="text" placeholder={props.data.placeholder} />: <input autoComplete='off' type="text" placeholder={props.data.placeholder} disabled /> 
          :<input autoComplete='off' type="text"  placeholder={props.data.placeholder} disabled={props.data.title !== 'where'} />
        }
        {
          props.title === 'who' && <SearchIcon>
            <div className="icon"><GoSearch/></div>
          </SearchIcon>
        }
      </div>
      <Content isShow={isShowDropdown} ref={dropdownRef} index={props.data.id}>
        {props.children}
      </Content>
    </ButtonContainer>
  )
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: transparent;
  color: ${(props) => props.theme.text};
  height: 100%;
  width:100%;
  cursor: pointer;
  border-radius: 40px;
  box-shadow: ${props => props.isShow && 'rgba(0, 0, 0, 0.24) 0px 3px 8px'};
  transition: all ease 250ms;
  margin: 10px auto;

  .contain{
    height: 100%;
    width: 90%;
    padding:0 1rem;
    border-radius: 40px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-transform: capitalize;
    justify-content:space-evenly;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
  }
  .contain:hover{
    background-color: ${props =>`rgba(${props.theme.textRgba}, 0.1)`};
  }
  .contain.active{
    background-color: ${props => props.theme.body};
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  .contain label{
    cursor: pointer;
    font-size: ${props => props.theme.fontsm};
    font-weight: bold;
    
  }
  .contain input{
    background-color: transparent;
    border: none;
    outline: none;
    height: 1.5rem;
    font-size: ${props => props.theme.fontsm};
    font-weight: bold;
    position: relative;
    max-width: 13rem;
    min-width: 10vw;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
  }
  .contain input::placeholder{
    font-weight: lighter;

  }
  @media (max-width: 960px){
    .contain input{
      width: 15vw;
    }
  }
  @media (max-width: 740px){
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    width:100%;
    height: ${props => props.isShow? '100%': '4rem'};
    display: flex;
    flex-direction: column;
    justify-content: start;

    .contain{
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 80vw;
    }
    .contain.active{
      background-color: transparent;
      box-shadow: none;
      height: fit-content;
    }
    .contain:hover{
      background-color: transparent;
    }
    .contain label{
      width: fit-content;
      font-size: ${props => props.theme.fontmd};
    }
    .active label{
      font-size: ${props => props.theme.fontxl};
    }
    .contain input{
      width: 15rem;
      text-align: right;
    }
    .active{
      flex-direction: column;
      align-items: flex-start;
    }
    .contain.active input{
      width: 95%;
      text-align: left;
      border-radius: 5px;
      border: 1px solid ${props => props.theme.text};
      padding: 1rem 0.5rem ;
      margin-bottom: 10px;
      font-size: ${props => props.theme.fontsm};
      display: ${props => props.isone===1? 'block':'none'}
    }
    
  }
`;
const Content = styled.div`
  display: ${(props) => (props.isShow ? "flex" : "none")};
  border-radius: 20px;
  flex-direction: column;
  top: ${props => props.index === 4? '40%': 0};
  left: ${props => props.index === 1? '-20%': props.index === 4? '20%':'0%'};
  transform: translate(50%, 25%);//${props => props.index === 1? 'translate(50%, 25%)': props.index === 4? 'translate(50%, 25%)':'translate(50%, 23%)'};
  position: absolute;
  background-color: ${(props) => props.theme.body};
  width: fit-content;
  height: max-content;
  padding: 0.5rem 0;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  z-index: 10;


  @media (max-width: 740px){
    box-shadow: none;
    position: relative;
    top: 0;
    left: 0;
    transform: translate(0, 0);
    width: 95%;
    overflow: auto;
    justify-content: start;
  }
`;
const SearchIcon = styled.div`
  background-image: linear-gradient(90deg, ${props => props.theme.logo} , #E51313);
  color: ${props => props.theme.body};
  font-size: ${props => props.theme.fontlg};
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  position: absolute;
  right: 2%;
  border-radius: 40px;

  .icon{
    min-width: 1.5rem;
    min-height: 1.5rem;
    display: grid;
    justify-content: center;
  }
`
