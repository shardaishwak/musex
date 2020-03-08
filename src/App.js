import React from 'react';
import './App.css';
import styled from 'styled-components'
import Player from "./components/player";
import Playlist from "./components/playlist";

import song1 from "./music/DROELOE - Sunburn (Official Audio).mp3";
import song2 from "./music/Anne-Marie - BIRTHDAY.mp3";
import song3 from "./music/Kehlani - Gangsta (from Suicide Squad - The Album) [Official Video].mp3";
import song4 from "./music/twenty one pilots - Heathens.mp3";
import song5 from "./music/San Holo - Surface (feat. Caspian).mp3";
import cover from "./images/flowers.jpg";
import song6 from "./music/Aero Chord - ANTHEM.mp3";
import song7
    from "./music/Biometrix & Sarah De Warren - Harley Fvcking Quinn (ft. Marcus) [Magic x Nightblue Release].mp3";
import song8 from "./music/Sickick - Infected (Barren Gates Remix).mp3";

const Container = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    justify-content: space-between;
`;

class App extends React.PureComponent {
    state = {
        songs: [
            {id: 1, src: song1, name: "Sunburn", artist: "DROELOE", img: "https://images.unsplash.com/photo-1508726295872-0b87b9999406?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80"},
            {id: 2, src: song2, name: "Birthday", artist: "Anne Marie", img: "https://images.unsplash.com/photo-1487088678257-3a541e6e3922?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"},
            {id: 3, src: song3, name: "Gangsta", artist: "Kehlani", img: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80"},
            {id: 4, src: song4, name: "Heathens", artist: "Twenty one pilots", img: "https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"},
            {id: 5, src: song5, name: "Surface", artist: "San Holo", img: cover},
            {id: 6, src: song6, name: "Anthem", artist: "Aero Chord", img: cover},
            {id: 7, src: song7, name: "Harley Fvcking Quinn", artist: "Biometrix & Sarah De Warren", img: cover},
            {id: 8, src: song8, name: "Infected", artist: "Sickick", img: "https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"}
        ],
        play: false,
        song_duration: 0,
        current_time: 0,
        current_song: 0,
        repeat: false,
        repeat_once: false,
        random_next: false
    };
    audio = new Audio();
    componentDidMount() {
        //  Windows handlers
        window.addEventListener("keydown", (e) => {
            if (e.ctrlKey && e.keyCode === 80 && e.shiftKey) {
                this.handlePlay()
            }
        });
        this.playSong(0, true);

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
    playSong = (index, first) => {
        const song = this.state.songs[index];
        if (!this.audio.paused) this.audio.pause();
        this.audio.src = song.src;
        this.audio.onloadeddata = () => {
            this.setState({
                song_duration: this.audio.duration,
                current_song: index
            });
            if (!first) this.handlePlay();
        };
        this.handleDocumentTitle(song.artist + " - " + song.name)
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
        if (this.state.current_song + 1 >= this.state.songs.length) {
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
        const index = this.state.songs.findIndex(i => i.id === id);
        this.playSong(index)
    };
    //  Forward 10 seconds
    seekForward = () => {
        this.audio.currentTime = this.state.current_time + 10
    };
    //  Backward 10 seconds
    seekBackward = () => {
        this.audio.currentTime = this.state.current_time - 10;
    };
    //  Random 1 music to start from
    shuffle = () => {
        this.playSong(Math.floor(Math.random() * Math.floor(this.state.songs.length)));
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
    convertTitle = (title) => {
        if (title.length > 30) {
            return title.substring(0, 29) + "..."
        } else return title;
    };
    handleRewinds = () => {
        if (this.state.repeat) {
            this.setState({repeat_once: false, repeat: false})
        } else if (this.state.repeat_once) {
            this.setState({repeat: true, repeat_once: false})
        } else {
            this.setState({repeat_once: true, repeat: false})
        }
    };
    render() {
        if (process.env.NODE_ENV === "development") console.log(this.state);
        return(
            <Container>
                <Playlist
                    songs={this.state.songs}
                    playChoose={this.playChoose}
                    current_song={this.state.current_song}
                    shuffle={this.shuffle}/>

                <Player
                    songs={this.state.songs}
                    play={this.state.play}
                    song_duration={this.state.song_duration}
                    current_song={this.state.current_song}
                    current_time={this.state.current_time}
                    repeat={this.state.repeat}
                    repeat_once={this.state.repeat_once}
                    random_next={this.state.random_next}
                    playSong={this.playSong}
                    handlePlay={this.handlePlay}
                    handleVolume={this.handleVolume}
                    handleSlide={this.handleSlide}
                    handleRewinds={this.handleRewinds}
                    convertTime={this.convertTime}
                    convertTitle={this.convertTitle}
                    prevSong={this.prevSong}
                    nextSong={this.nextSong}
                />
            </Container>
        )
    }
}

export default App;
