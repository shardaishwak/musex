import React from "react";
import styled from "styled-components";
import {Hole, ImageContainer} from "../player/Layout";

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
        font-size: 22px;
        cursor: pointer;
    }
`;
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
    cursor: pointer;
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
`
const Time = styled.div`
    font-size: 15px;
    font-family: Poppins;
`

class Playlist extends React.PureComponent {
    geetDuration = (audio) => {
        audio.addEventListener("loadedmetadata", () => {
            return audio.duration
        })
    };
    render() {
        const {songs, current_song, playChoose, shuffle} = this.props;
        return (
            <Container>
                <Title><div>Songs</div><div onClick={shuffle}><i className="fas fa-random"></i></div></Title>
                <Songs>
                    {songs.map((song) => {
                        const audio = new Audio();
                        audio.src = song.src;

                        return <Song key={song.id} onClick={() =>  playChoose(song.id)}>
                                <Left>
                                    <ImageContainer src={song.img}>
                                        {songs[current_song].id === song.id ? <i style={{color: "#fff", fontSize: "20px"}} className="fas fa-waveform"></i> : <Hole />}
                                    </ImageContainer>
                                    <SongTitle>{song.name}</SongTitle>
                                </Left>
                                <SongArtist>{song.artist}</SongArtist>
                        </Song>
                    })}

                </Songs>
            </Container>
        )
    }
}

/**
 *
 *
 {songs.map((song) =>
                    <h5
                        style={{cursor: "pointer"}}
                        key={song.id}
                        onClick={() => playChoose(song.id)}
                    >
                        {songs[current_song].id === song.id ? "▶" : null}{song.name}
                    </h5>)}
 */

export default (Playlist)