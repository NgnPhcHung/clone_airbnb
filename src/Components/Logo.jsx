import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function Logo() {
  return (
    <LogoContainer>
      <Link to='/' >
        airbnb
      </Link>
    </LogoContainer>
  )
}

const LogoContainer = styled.h3`
  cursor: pointer;
  color: ${props => props.theme.logo};
  font-size: ${props => props.theme.fontlg};
  margin-left: 1rem;

  @media (max-width: 950px){
    margin-right: 15px;
  }
  @media (max-width: 740px){
    display: none;
  }
`