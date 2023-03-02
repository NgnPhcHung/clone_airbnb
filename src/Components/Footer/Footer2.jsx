import { LoremIpsum } from 'lorem-ipsum'
import React from 'react'
import { BsGlobe } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { modalAction } from '../../Redux/Action/modalAction'

const Footer2 = () => {
  const dispatch = useDispatch()
  const lorem = new LoremIpsum({
    wordsPerSentence: {
      max: 7,
      min: 4
    }
  });
  const openLanguage = ()=>{
    dispatch( modalAction.toggleLanguage() )
  }
  const openCurrency = ()=>{
    dispatch( modalAction.toggleCurrency() )
  }
  return (
    <Container>
      <Top>
        <List>
          {
            Array(7).fill().map((item, i) => <ListItem key={i}>{lorem.generateWords(2)}</ListItem>)
          }
        </List>
        <List>
          {
            Array(3).fill().map((item, i) => <ListItem key={i}>{lorem.generateWords(2)}</ListItem>)
          }
        </List>
        <List>
          {
            Array(7).fill().map((item, i) => <ListItem key={i}>{lorem.generateWords(2)}</ListItem>)
          }
        </List>
        <List>
          {
            Array(7).fill().map((item, i) => <ListItem key={i}>{lorem.generateWords(2)}</ListItem>)
          }
        </List>
        <List>
          {
            Array(7).fill().map((item, i) => <ListItem key={i}>{lorem.generateWords(2)}</ListItem>)
          }
        </List>
      </Top>
      <Under>
        <Left>
          <p>© 2023 Airbnb clone.</p>
          <p>by Phúc Hưng</p>
        </Left>
        <Right>
          <p onClick={openLanguage} ><BsGlobe/> English</p>
          <p onClick={openCurrency}>USA</p>
        </Right>
      </Under>
    </Container>
  )
}

const Container = styled.div`
  margin: 1rem auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  position: relative;

  &::before{
    top: 0;
    position: absolute;
    content: '';
    width: 100%;
    height: 1px;
    background-color: ${props => props.theme.gray};
  }
`
const Top = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-column-gap: 20px;
  width: 100%;
  height: fit-content;
  padding: 1.4rem auto;
  margin: 0.5rem auto;
`
const Under = styled.div`
  display: flex;
  justify-content: space-between;
  height: fit-content;
  font-weight: bold;
  width: 100%;
  position: relative;
  margin: 0.5rem auto;

&::before{
  top: -10px;
  position: absolute;
  content: '';
  width: 100%;
  height: 1px;
  background-color: ${props => props.theme.gray};
}
`
const List = styled.ul`
  list-style: none;
  width: 10rem;
  @media (max-width: 740px){
    width: calc(95% - 20px);
  }
`
const ListItem = styled.li`
  margin-bottom: 5px;
  &:first-child{
    font-weight: bold;
  }
  &:hover:not(:first-child){
    text-decoration: underline;
    cursor: pointer;
  }
`
const Right = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 10px;
  width: 35%;
  p{
    cursor: pointer;
  }
  p:hover{
    text-decoration: underline;
  }
`
const Left = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  width: 30%;
  
`

export default Footer2