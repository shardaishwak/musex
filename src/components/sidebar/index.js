import React from "react";
import styled from 'styled-components'

const Container = styled.div`
    background: #212121;
    color: #fff;
`;

class Sidebar extends React.PureComponent {
    render() {
        return (
            <Container>sidebar</Container>
        )
    }
}

export default Sidebar