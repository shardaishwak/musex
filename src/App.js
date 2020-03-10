import React, {Suspense} from 'react';
import './App.css';
import * as firebase from "firebase";
import styled from "styled-components";
const Main  = React.lazy(() => import("./components/audio"));


class App extends React.PureComponent {
    state = {
        auth: false,
        account: null,
        doc: null,
        loading: false,
        error: null,

        email: "",
        password: ""
    };
    async componentDidMount() {
        this.setState({loading: true, error: null});
        const firestore = firebase.firestore()
        await firebase.auth()
            .onAuthStateChanged(user => {
                if (user) {
                    this.setState({auth: true, account: user});
                    firestore
                        .collection("users")
                        .doc(user.uid)
                        .get()
                        .then(doc => {
                            if (doc.exists) this.setState({doc: doc.data()})
                            this.setState({loading: false})
                        })
                        .catch(err => {
                            this.setState({loading: false, error: err.message})
                        });
                } else {
                    this.setState({auth: false, account: null, loading: false, doc: null})
                }
            });
    }
    Signup = async (email, password) => {
        this.setState({loading: true, error: null})
        const firestore = firebase.firestore();
        await firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                this.setState({auth: true, account: user.user});
                firestore
                    .collection("users")
                    .doc(user.user.uid)
                    .set({
                        createdAt: new Date()
                    })
                    .then(doc => this.setState({loading: false}))
                    .catch(err =>  this.setState({loading: false, error: err.message}));
            })
            .catch(err => {
                this.setState({loading: false, error: err.message})
            });

    };
    Login = async (email, password) => {
        this.setState({loading: true, error: null});

        await firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(user => {
                this.setState({loading: false});
            })
            .catch(err => {
                this.setState({loading: false, error: err.message})
            });
    };
    Logout = async () => {
        await firebase.auth()
            .signOut()
            .catch(err =>  this.setState({loading: false, error: err.message}))
    };
    handleInput = (e) => this.setState({[e.target.name]: e.target.value});

    render() {
        console.log(this.state)
        if (this.state.loading) return <Loading className={"fas fa-spinner-third"}/>;
        else if (this.state.auth) return (
            <>
                <Suspense fallback={<Loading />}>
                    <Main />
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
                        <button className="login" onClick={() => this.Login(this.state.email, this.state.password)}>Login</button>

                        <button className="signup" onClick={() => this.Signup(this.state.email, this.state.password)}>Create ccount</button>
                    </Buttons>
                </Form>
                <Error>{this.state.error ? this.state.error : null}</Error>
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
const Form = styled.form`
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

export default App;
