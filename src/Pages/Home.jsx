import styled from 'styled-components'
import Footer from '../Components/Footer'
import Nav from '../Components/Nav'
import Searchbar from '../Components/Nav/Searchbar'
import BodyDisplay from '../Section/BodyDisplay'

export default function Home() {
  return (
    <HomeContainer>
      <Nav show={true} >
        <Searchbar/>
      </Nav>
      <BodyDisplay/>
      <Footer/>
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  width: 100vw;
  height: fit-content;
  background-color: ${props => props.theme.body};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
