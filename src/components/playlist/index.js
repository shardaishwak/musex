import React from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {Logout} from '../../store/actions/authActions'
import NewSong from "./NewSong";
import gradients from "../../gradients";
import {DeleteSong} from '../../store/actions/songsActions'

const Container = styled.div`
    padding: 30px 100px;
    overflow-y: scroll;
    height: 100%;
`;
const Title = styled.div`
    font-size: 30px;
    font-weight: bold;
    font-family: Poppins;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    i {
        font-size: 17.5px;
        cursor: pointer;
    }
`;
const Right = styled.div`
    display: flex;
    align-items: center;
    font-size: 20px;
`
const LogoutButton = styled.i`
    margin-left: 30px;
     font-size: 15px;
`
const Songs = styled.div`
    display: flex;
    flex-direction: column;
`;
const Song = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px;
    border-radius: 10px;
    transition: .1s linear; 
    border-bottom: 1px solid #ddd;
    
    &:hover {
        box-shadow: 0 5px 10px rgba(0, 0, 0, .1);
    }
    &.active {
        color: blue;
    }
`
const Left = styled.div`
    display: flex;
    align-items: center;
`
const Icon = styled.i`
    margin-right: 5px;
    font-size: 25px;
    background: linear-gradient(${props => props.grad_one}, ${props => props.grad_two});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`
const SongTitle = styled.div`
    font-size: 20px;
    font-weight: bold;
    font-family: Poppins;
    margin-left: 20px;
`;
const SongArtist = styled.div`
    font-size: 14px;
    font-family: Poppins;
    display: flex;
    justify-content: flex-start;
    text-align: left;
    align-items: center;
`
const Time = styled.div`
    font-size: 15px;
    font-family: Poppins;
`
const AddMusic = styled.i`
    margin-left: 30px;
`;
const DeleteSongButton = styled.i`
    margin-left: 20px;
    cursor: pointer;
    transition: .1s linear;
    
    &:hover {color: red;}
`
const DeleteOverflow = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    top: 0;
    background: #00000050;
`
const DeleteWrapper = styled.div`
    display: flex;
    margin-top: 25vh;
    justify-content: center;
`
const DeleteContainer = styled.div`
    width: 60%;
    border-radius: 7.5px;
    background: #fff;
    display: flex;
    flex-direction: column;
    
    padding: 25px 30px;
    
    .main {
        font-size: 25px;
        font-weight: bold;
        color: #ed2939;
        font-family: Poppins;
    }
    .message {
        margin-top: 10px;
        font-family: Poppins;
    }
    .buttons {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-family: Poppins;
    }
`
const Button = styled.div`
    background: ${props => props.main ? "#ed2939" : "transparent"};
    color: ${props => props.main ? "#fff" : "#212121"};
    text-transform: uppercase;
    padding: 9px 15px;
    border-radius: 5px;
    font-size: 13px;
    cursor: pointer;
    margin-left: 12px;
        font-family: Poppins;
`



class Playlist extends React.PureComponent {
    state = {add_song: false, deleteSong: null, deleting: false}
    handleAddSong = () => this.setState({add_song: !this.state.add_song})
    handleRemoveDelete = () => this.setState({deleteSong: null})
    handleDeleteSong = (title, id, artist) => this.setState({deleteSong: {id, title, artist}})
    DELETE_SONG = async () => {
        this.setState({deleting: true})
        console.log(this.props.songs)

        console.log(this.state.deleteSong.id)
        await this.props.DeleteSong(this.state.deleteSong.id)
        this.setState({deleting: false, add_song: false})
        this.props.song_deleted();
        this.handleRemoveDelete()
    }
    render() {
        const sorted_songs = this.props.songs.length > 0 ? this.props.songs.sort((a,b) => {
            const title_a = a.title.toLowerCase(), title_b = b.title.toLowerCase();
            if (title_a < title_b) return -1;
            else return 1;
        }) : [];
        const {
            current_song,
            playChoose,
            shuffle,
        } = this.props;
        return (
            <>
                {this.state.add_song ? <NewSong toggleAddSong={this.handleAddSong} /> : null}
                {this.state.deleteSong ? <DeleteOverflow>
                    <DeleteWrapper>
                        <DeleteContainer>
                            <div className="main">Delete</div>
                            <div className="message">Do you want to delete {this.state.deleteSong.title} by {this.state.deleteSong.artist}?</div>
                            <div className="buttons">
                                <Button main disabled={this.state.deleting} onClick={this.DELETE_SONG}>{this.state.deleting ? "deleting" : "delete"}</Button>
                                <Button disabled={this.state.deleting} onClick={this.handleRemoveDelete}>Cancel</Button>
                            </div>
                        </DeleteContainer>
                    </DeleteWrapper>
                </DeleteOverflow> : null}
                <Container>
                    <Title>
                        <div>Songs</div>
                        <Right>
                            {sorted_songs.length > 0 ? <div onClick={shuffle}><i className="fad fa-random"/></div> : null}
                            <LogoutButton className={"fad fa-power-off"} onClick={this.props.Logout}/>
                            <AddMusic className={"fad fa-plus"} onClick={this.handleAddSong}/>
                        </Right>
                    </Title>
                    <Songs>
                        {sorted_songs.length > 0 ? sorted_songs.map((song) => {
                            const rand = Math.floor(Math.random() * gradients.length);
                            return <Song key={song.id}>
                                <Left onClick={() =>  playChoose(song.id)}>
                                    <div>
                                        {current_song !== null && sorted_songs[current_song].id === song.id ? <Icon className="fas fa-waveform" grad_one={gradients[rand].colors[0]}  grad_two={gradients[rand].colors[1]}/> : <Icon className={"fas fa-music"}  grad_one={gradients[rand].colors[0]}  grad_two={gradients[rand].colors[1]}/>}
                                    </div>
                                    <SongTitle>{song.title}</SongTitle>
                                </Left>
                                <SongArtist>{song.artist} <DeleteSongButton onClick={() => this.handleDeleteSong(song.title, song.id, song.artist)} className={"far fa-trash"}/></SongArtist>
                            </Song>
                        }) : <NoSongFound onClick={this.handleAddSong}>Add your first song <i className={"fad fa-plus"}/></NoSongFound>}

                    </Songs>
                </Container>
            </>
        )
    }
}

const NoSongFound = styled.div`
    padding-top: 30px;
    font-size: 17.5px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: .4;
    font-family: Poppins;
    cursor: pointer;
    i {
        margin-left: 15px;
    }
    
    &:hover {opacity: .8};
`
const ms = state => {
    return {
        songs: state.songs.songs
    }
}
export default connect(ms, {Logout: Logout, DeleteSong: DeleteSong})(Playlist)