import React, {  useState } from "react";
import { BsX } from "react-icons/bs";
import styled from "styled-components";

export default function TabSelector() {
  const [selected, setSelected] = useState(1); 
  const handleClick = (divNum) => () => {
    setSelected(divNum);
  };

  return (
    <Tab>
      <BsX className="closeSelection" />
      <div className="tab-item">
        <p className={`${selected === 1? 'active':undefined}`} onClick={handleClick(1)} >Stays</p>
        <p className={`${selected === 2? 'active':undefined}`} onClick={handleClick(2)}>Experiences</p>
      </div>
    </Tab>
  );
}

const Tab = styled.div`
  width: 90vw;
  display: grid;
  justify-content: center;
  position: relative;
z-index: 100;
  .closeSelection {
    display: none;
  }

  .tab-item{
    display:grid;
    grid-template-columns: auto auto;
    grid-gap: 1rem;
    width: 50%;  
  }
  .tab-item > p {
    font-weight: bolder;
    font-size: ${props => props.theme.fontlg};
    position: relative;
    cursor: pointer;
    color: ${props => `rgba(${props.theme.textRgba}, 0.7)`};
  }
  .tab-item > p:hover {
    color: ${props => `rgba(${props.theme.textRgba}, 0.9)`};
  }
  .tab-item  p::after{
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    top: 100%;
    left: 0;
    background-color: ${props => props.theme.text};
    transition: transform 0.25s ease-out;
  }
  .tab-item p:nth-child(1)::after{
    transform-origin:  right bottom;
  }
  .tab-item p:nth-child(2)::after{
    transform-origin: bottom  left;
  }
  p.active{
    color: ${props => props.theme.text};
  }

  .tab-item  p.active::after {
    transform: scaleX(1);
  }
  .tab-item p:nth-child(1).active::after {
    transform: scaleX(1);
    transform-origin:  bottom right ;
  }
  .tab-item  p:nth-child(2).active::after {
    transform: scaleX(1);
    transform-origin: left right bottom ;
  }
`;
