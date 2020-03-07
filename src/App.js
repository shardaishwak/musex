import React from 'react';
import './App.css';
import styled from 'styled-components'
import Sidebar from "./components/sidebar";
import Player from "./components/player";

const Container = styled.div`
    height: 100vh;
    display: grid;
    grid-template-columns: 20% auto;
`;

class App extends React.PureComponent {
    render() {
        return(
            <Container>
                <Sidebar />
                <Player />
            </Container>
        )
    }
}

export default App;
