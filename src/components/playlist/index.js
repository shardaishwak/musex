import React from "react";
import styled from "styled-components";
import {Hole, ImageContainer} from "../player/Layout";
import * as firebase from "firebase";

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
const AddMusic = styled.i`
    margin-left: 30px;
`;

class Playlist extends React.PureComponent {

    render() {
        const {songs,
            current_song,
            playChoose,
            shuffle,
            toggleAddMusic,
            handleFile,
            handleArtist,
            handleFileSubmit,
            handleTitle,
            handleCancel,
            add_new,
            file,
            file_info,
            error,
            progress,
            status,
            cancel,
            uploading,
            Logout
        } = this.props;
        return (
            <>
                {add_new ? <Overlay>
                    <h1>Add new Music</h1>
                    <form>
                            <input type="file" accept={".mp3,audio/*"} name="file" id="file"  onChange={handleFile}/>
                    </form>
                    {file ? <div>
                        <p>Filename: {file.name}</p>
                        <div>Custom Title: <input type="text" name="title" id="title" value={file_info.title} onChange={handleTitle} /></div>
                        <div>Custom Artist: <input type="text" name="artist" id="artist" value={file_info.artist} onChange={handleArtist}/></div>


                        <button onClick={handleFileSubmit}>Add file</button>
                        {!cancel ? <div><Progress status={status} process={progress} /> {status}</div>: null}

                        {uploading && !cancel ? <div>
                            <button onClick={handleCancel}>Cancel</button>
                        </div> : cancel ? "Cancelled" : null}
                        {error ? error : null}

                    </div> : null}
                </Overlay> : null}
                <Container>
                    <Title>
                        <div>Songs</div>
                        <Right>
                            {songs.length > 1 ? <div onClick={shuffle}><i className="fad fa-random"/></div> : null}
                            <LogoutButton className={"fad fa-power-off"} onClick={Logout}/>
                            <AddMusic className={"fad fa-plus"} onClick={toggleAddMusic}/>
                        </Right>
                    </Title>
                    <Songs>
                        {songs.length > 0 ? songs.map((song) => {
                            const audio = new Audio();
                            audio.src = song.url;

                            return <Song key={song.id} onClick={() =>  playChoose(song.id)}>
                                <Left>
                                    <ImageContainer src={song.img}>
                                        {current_song !== null ? songs[current_song].id === song.id ? <i style={{color: "#fff", fontSize: "20px"}} className="fas fa-waveform"/> : <Hole /> : <Hole />}
                                    </ImageContainer>
                                    <SongTitle>{song.title}</SongTitle>
                                </Left>
                                <SongArtist>{song.artist}</SongArtist>
                            </Song>
                        }) : <NoSongFound onClick={toggleAddMusic}>Add your first song <i className={"fad fa-plus"}/></NoSongFound>}

                    </Songs>
                </Container>
            </>
        )
    }
}

const Overlay = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: rgba(0, 0, 0, .6);
`;
const Progress = styled.div`
    width: 50%;
    background: linear-gradient(90deg, ${props => props.status === "running" ? "orange" : props.status === "completed" ? "green" : props.status === "cancelled" ? "red" : "blue"} 0% ${props => props.process}%, #d3d3d3 ${props => props.process}% 100%);
    height: 5px;
    border-radius: 999;
    transition: width .1s linear; 
`;
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
`

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