import React from 'react';
import styled from 'styled-components'
import Player from "../player";
import Playlist from "../playlist";
import {connect} from "react-redux";

const Container = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    justify-content: space-between;
`;

class Main extends React.PureComponent {
    state = {
        songs: [],
        play: false,
        song_duration: 0,
        current_time: 0,
        current_song: null,
        repeat: false,
        repeat_once: false,
        random_next: false,

        volume: 1,
        last_volume: 1,
        mute: false,

    };
    audio = new Audio();
    async componentDidMount() {
        //  Add fetched music

        if (this.props.songs) {
            this.playSong(0, true);
        }

            this.audio.ontimeupdate = () => {
                //  Time update
                this.setState({current_time: this.audio.currentTime, volume: this.audio.volume});
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
        const song = this.props.songs[index];
        if (!this.audio.paused) this.audio.pause();
        this.audio.src = song.url;
        this.audio.onloadeddata = () => {
            this.setState({
                song_duration: this.audio.duration,
                current_song: index
            });
            if (!first) this.handlePlay();
        };
        this.handleDocumentTitle(song.artist + " - " + song.title)
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
        this.setState({volume: e.target.value, last_volume: e.target.value})
    };
    //  Time slider
    handleSlide = (e) => {
        this.audio.currentTime = e.target.value
    };
    //  Next song
    nextSong = () => {
        let next_song;
        if (this.state.current_song + 1 >= this.props.songs.length) {
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
        const index = this.props.songs.findIndex(i => i.id === id);
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
        this.playSong(Math.floor(Math.random() * Math.floor(this.props.songs.length)));
    };
    //  Toggle mute
    toggleMute = () => {
        if (this.state.mute) {
            this.setState({mute: false, volume: this.state.last_volume});
            this.audio.volume = this.state.last_volume;
        } else {
            this.setState({mute: true, volume: 0});
            this.audio.volume = 0;
        }
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
        if (title.length > 20) {
            return title.substring(0, 20) + "..."
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
        console.log("rendering...")
        if (process.env.NODE_ENV === "development") console.log(this.state);
        return(
            <Container>
                <Playlist
                    playChoose={this.playChoose}
                    current_song={this.state.current_song}
                    shuffle={this.shuffle}
                />
                <Player
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
                    volume={this.state.volume}
                    toggleMute={this.toggleMute}
                />
            </Container>
        )
    }
}
const mapStateToProps = state => {
    return {
        songs: state.songs.songs
    }
}

export default connect(mapStateToProps, null)(Main);
