import React, {Suspense} from 'react';
import './App.css';
import * as firebase from "firebase";
import styled from "styled-components";
import {AuthLoading, AuthStatus, GetAuthInfo, Login, RemoveAuthInfo, Signup} from "./store/actions/authActions";
import {connect} from "react-redux";
import {GetSongs} from "./store/actions/songsActions";
const Main  = React.lazy(() => import("./components/audio"));


class App extends React.PureComponent {
    state = {
        email: "",
        password: "",
    };
    async componentDidMount() {
        await this.props.AuthStatus()
    }
    handleInput = (e) => this.setState({[e.target.name]: e.target.value});

    render() {
        console.log(this.state);
        if ( this.props.auth.loading) return <Loading className={"fas fa-spinner-third"}/>;
        else if (this.props.auth.auth && !this.props.auth.loading) return (
            <>
                <Suspense fallback={<Loading className={"fas fa-spinner-third"} />}>
                    <Main songs={this.props.songs} />
                </Suspense>
            </>
        );
        else return (
            <Container>
                <Title>Musex</Title>
                <SmallTitle>Enjoy your music in the cloud</SmallTitle>
                <Form>
                    <input type="email" name="email" id="email" onChange={this.handleInput} value={this.state.email} />
                    <input type="password" name="password" id="password" onChange={this.handleInput} value={this.state.password} />
                    <Buttons>
                        <button className="login" onClick={() => this.props.Login(this.state.email, this.state.password)}>Login</button>
                        <button className="signup" onClick={() => this.props.Signup(this.state.email, this.state.password)}>Create ccount</button>
                    </Buttons>
                </Form>
            </Container>
        )
    }
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`
const Title = styled.div`
    font-weight: bold;
    font-family: Poppins;
    font-size: 40px;
    text-align-center;
`
const SmallTitle = styled(Title)`
    font-size: 15px;
    font-weight: 400;
    margin-bottom: 50px;
`
const Form = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 25%;
    
    input {
        padding: 10px 20px;
        font-size: 15px;
        border-radius: 3px;
        border: 1px solid #eee;
        margin-bottom: 15px;
    }
`
const Buttons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    
    button {
        margin: 0 10px;

        padding: 12px 20px;
        border-radius: 3px;
        text-transform: uppercase;
        color: #fff;
        border: none;
        cursor: pointer;
    }
    button.login {
        color: #fff;
        background: #212121;
    }
    button.signup {
        color: #212121;
        background: #fff;
        
        &:hover {
            background: #eee;
        }
        
    }
`;
const Error = styled.p`
    color: #ea3c53;
    margin-top: 30px;
`
const Loading = styled.i`
    display: flex;
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    animation rotate 1s linear infinite;
    
    @keyframes rotate {
        from {transform: rotate(0deg)}
        to {transform: rotate(360deg)}
    }
`
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        songs: state.songs.songs
    }
}

export default connect(mapStateToProps, {
    AuthStatus,
    GetAuthInfo,
    RemoveAuthInfo,
    AuthLoading: AuthLoading,
    GetSongs: GetSongs,
    Signup: Signup,
    Login: Login
})
(App);
