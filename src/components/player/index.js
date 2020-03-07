import React from "react";
import song1 from "../../music/DROELOE - Sunburn (Official Audio).mp3"
import song2 from "../../music/Anne-Marie - BIRTHDAY.mp3"
import song3 from "../../music/Kehlani - Gangsta (from Suicide Squad - The Album) [Official Video].mp3"
import song4 from "../../music/twenty one pilots - Heathens.mp3"
import song5 from "../../music/San Holo - Surface (feat. Caspian).mp3"
import styled from 'styled-components'

const songs = [
    {id: 1, src: song1, name: "DROELOE - Sunburn"},
    {id: 2, src: song2, name: "Anne Marie - Birthday"},
    {id: 3, src: song3, name: "Kehlani - Gangsta"},
    {id: 4, src: song4, name: "Twenty one pilots - Heathens"},
    {id: 5, src: song5, name: "San Holo - Surface"}
];

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

class Player extends React.PureComponent {
    state = {
        play: false,
        song_duration: 0,
        current_time: 0,
        current_song: 0,
        repeat: false,
        repeat_once: false
    };
    audio = new Audio();
    componentDidMount() {
        //  Windows handlers
        window.addEventListener("keydown", (e) => {
           if (e.ctrlKey && e.keyCode === 80 && e.shiftKey) {
               this.handlePlay()
           }
        });
        this.handleDocumentTitle(songs[this.state.current_song].name);
        this.playSong(0);

        this.audio.ontimeupdate = () => {
            //  Time update
            this.setState({current_time: this.audio.currentTime});
            //  Check if the song paused
            if (this.audio.paused) this.setState({play: false});
            else this.setState({play: true});
            //  Go next if song finished
            if (this.state.current_time >= this.state.song_duration) {
                //  Check if repeat continuously
                if (this.state.repeat) {
                    this.audio.currentTime = 0;
                    this.setState({current_time: 0});
                }
                //  Check if repeat once
                else if (this.state.repeat_once) {
                    this.audio.currentTime = 0;
                    this.setState({current_time: 0});
                    this.setState({repeat_once: false})
                }
                //  Next song if not of last conditions
                else this.nextSong();
            }
        };
    }
    //  Handle document title update
    handleDocumentTitle = (name) => {
        document.title = name
    };
    //  Main for playing music, handles all
    playSong = (index) => {
        const song = songs[index];
        if (!this.audio.paused) this.audio.pause();
        this.audio.src = song.src;
        this.audio.onloadeddata = () => {
            this.setState({
                song_duration: this.audio.duration,
                current_song: index
            });
            this.handlePlay()
        };
        this.handleDocumentTitle(song.name)
    };
    //  Play button
    handlePlay = () => {
        if (this.audio.paused) {
            this.setState({play: true});
            this.audio.play();
        } else {
            this.setState({play: false});
            this.audio.pause();
        }
    };
    //  Volume slider
    handleVolume = (e) => {
        this.audio.volume = e.target.value;
    };
    //  Time slider
    handleSlide = (e) => {
        this.audio.currentTime = e.target.value
    };
    //  Next song
    nextSong = () => {
        let next_song;
        if (this.state.current_song + 1 >= songs.length) {
            next_song = 0;
        } else {
            next_song = this.state.current_song + 1;
        }
        this.playSong(next_song);
    };
    //  Previous song
    prevSong = () => {
        let prev_song;

        if (this.state.current_song - 1 < 0) {
            prev_song = 0
        } else {
            prev_song = this.state.current_song - 1
        }
        this.playSong(prev_song);
    };
    //  Play from list
    playChoose = (id) => {
        const index = songs.findIndex(i => i.id === id);
        this.playSong(index)
    };
    //  repeat countinously one song
    repeatEverytime = () => {
        this.setState({repeat: !this.state.repeat});
    };
    //  repeat a song again once
    repeatOnce = () => {
        this.setState({repeat_once: !this.state.repeat_once})
    };
    //  Convert seconds to normal time
    convertTime = (time) => {
        const seconds = time.toFixed(2);
        if (seconds < 60) {
            if (seconds < 10) {
                return `00:0${parseInt(seconds)}`
            } else {
                return `00:${parseInt(seconds)}`
            }
        } else {
            let minutes = parseInt(seconds / 60);
            let sec = parseInt(seconds % 60);
            let ret_min;
            let ret_sec;
            if (minutes < 10) {
                ret_min = "0" + minutes;
            } else {
                ret_min = minutes;
            }

            if (sec < 10) {
                ret_sec = "0" + sec
            } else ret_sec = sec;

            return ret_min + ":" + ret_sec
        }
    };

    render() {
        if (process.env.NODE_ENV === "development") console.log(this.state);

        return(
            <Container>
                <div>
                    <h3>Songs</h3>
                    {songs.map((song) => <h5 style={{cursor: "pointer"}} key={song.id} onClick={() => this.playChoose(song.id)}>{songs[this.state.current_song].id === song.id ? "▶" : null}{song.name}</h5>)}
                </div>
                <br/>
                <h5>{songs[this.state.current_song].name}</h5>
                <div>
                    <button  disabled={this.state.current_song === 0} onClick={this.prevSong}>Back</button>
                    <button onClick={this.handlePlay}>{this.state.play ? "Pause" : "Play"}</button>
                    <button disabled={this.state.current_song === songs.length - 1}  onClick={this.nextSong}>Next</button>
                    <button onClick={this.repeatOnce}>Repeat once: {this.state.repeat_once ? "On" : "Off"}</button>
                    <button onClick={this.repeatEverytime}>Repeat Evertime: {this.state.repeat ? "On" : "Off"}</button>
                </div>
                <div>{this.state.loading ? "Loading..." : `${this.convertTime(this.state.current_time)}/${this.convertTime(this.state.song_duration)}`}</div>
                <label htmlFor="volume">Volume</label>
                <input type="range" name="volume" min={0} max={1} step={0.0001} onChange={this.handleVolume}/>
                <label htmlFor="slide">Slide</label>
                <input type="range" name="slide" id="" value={this.state.current_time} onChange={this.handleSlide} min={0} max={this.state.song_duration} />
            </Container>
        )
    }
}

export default Player;