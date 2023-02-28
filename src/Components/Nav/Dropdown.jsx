import React, { useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import styled from "styled-components";

const Dropdown = (props) => {
  const [isShowDropdown, setShowDropdown] = useState(false);
  const btnRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (ev) => {
      if (btnRef.current && btnRef.current.contains(ev.target)) {
        setShowDropdown(!isShowDropdown);
      } else {
        setShowDropdown(false);
      }
    };
    window.addEventListener("click", handleClickOutside, true);
    return () => window.removeEventListener("click", handleClickOutside, true);
  });

  return (
    <DropdownContainer ref={btnRef} isShow={isShowDropdown}>
      <AiOutlineMenu className="icon"/><CiUser className="avatar"/>
      <Content isShow={isShowDropdown}>
        <button>
            Sign up
          </button>
          <button>
            Login
          </button>
          <div className='line' />
          <button>
            Airbnb your home
          </button>
          <button>
            Host an experiance
          </button>
          <button>
            Help
          </button>
      </Content>
    </DropdownContainer>
  );
};
const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: transparent;
  color: ${(props) => props.theme.text};
  height: 30%;
  width: 5rem;
  cursor: pointer;
  border-radius: 40px;
  border: 1px solid ${props => `rgba(${props.theme.textRgba}, 0.2)`};
  box-shadow: ${props => props.isShow && 'rgba(0, 0, 0, 0.24) 0px 3px 8px'};
  transition: all ease 250ms;
  &:hover{
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px
  }
  .avatar{
    background-color: ${props => `rgba(${props.theme.textRgba},0.4)`};
    padding: 5px;
    border-radius: 50%;
    font-size: ${props => props.theme.fontlg};
    color: ${props => props.theme.body};
  }
`;
const Content = styled.div`
  display: ${(props) => (props.isShow ? "flex" : "none")};
  border-radius: 20px;
  flex-direction: column;
  top: 130%;
  right: 0;
  position: absolute;
  background-color: ${(props) => props.theme.body};
  width: 15rem;
  padding: 0.5rem 0;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  z-index: 10;
  overflow: hidden;

  button {
    color: ${(props) => `rgba(${props.theme.textRgba}, 0.7)`};
    background-color: ${props => props.theme.body};
    border-width: 0;
    font-weight: 500;
    cursor: pointer;
    padding: 5px 0;
    transition: letter-spacing 0.4s ;
    width: 100%;
    height: 2.4rem;
    display: flex;
    align-items: flex-start;
    padding: 0.5rem 1rem;
  }
  button:active{
    font-weight: bold;
  }
  button:hover {
    background-color: ${(props) => `rgba(${props.theme.textRgba}, 0.07)`};
  }
  .line{
    height: 1px;
    width: 100%;
    background-color: ${props=> props.theme.gray};
    margin: 5px 0;
  }
`;


export default Dropdown;