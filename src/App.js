import React from 'react';
import './App.css';
import styled from 'styled-components'
import Player from "./components/player";

const Container = styled.div`
    height: 100vh;
`;

class App extends React.PureComponent {
    render() {
        return(
            <Container>
                <Player />
            </Container>
        )
    }
}

export default App;
