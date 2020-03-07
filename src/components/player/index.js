import React from "react";
import styled from 'styled-components'

import song1 from "../../music/DROELOE - Sunburn (Official Audio).mp3"
import song2 from "../../music/Anne-Marie - BIRTHDAY.mp3"
import song3 from "../../music/Kehlani - Gangsta (from Suicide Squad - The Album) [Official Video].mp3"
import song4 from "../../music/twenty one pilots - Heathens.mp3"
import song5 from "../../music/San Holo - Surface (feat. Caspian).mp3"
import song6 from "../../music/Aero Chord - ANTHEM.mp3"
import song7 from "../../music/Biometrix & Sarah De Warren - Harley Fvcking Quinn (ft. Marcus) [Magic x Nightblue Release].mp3"
import song8 from "../../music/Sickick - Infected (Barren Gates Remix).mp3"
import cover from "../../images/flowers.jpg"

const songs = [
    {id: 1, src: song1, name: "Sunburn", artist: "DROELOE", img: "https://images.unsplash.com/photo-1508726295872-0b87b9999406?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80"},
    {id: 2, src: song2, name: "Birthday", artist: "Anne Marie", img: "https://images.unsplash.com/photo-1487088678257-3a541e6e3922?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"},
    {id: 3, src: song3, name: "Gangsta", artist: "Kehlani", img: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80"},
    {id: 4, src: song4, name: "Heathens", artist: "Twenty one pilots", img: "https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"},
    {id: 5, src: song5, name: "Surface", artist: "San Holo", img: cover},
    {id: 6, src: song6, name: "Anthem", artist: "Aero Chord", img: cover},
    {id: 7, src: song7, name: "Harley Fvcking Quinn", artist: "Biometrix & Sarah De Warren", img: cover},
    {id: 8, src: song8, name: "Infected", artist: "Sickick", img: "https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"}
];

const Container = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

class Player extends React.PureComponent {
    state = {
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
        const song = songs[index];
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
        this.playSong(Math.floor(Math.random() * Math.floor(songs.length)));
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
    }

    render() {
        if (process.env.NODE_ENV === "development") console.log(this.state);
        const rewinds = [
            {id: 1, func: this.repeatOnce, icon: "fad fa-repeat-1-alt"},
            {id: 2, func: this.repeatEverytime, icon: "fad fa-repeat"},
            {id: 3, func: null, icon: "fad fa-angle-double-right"}
            ];


        return(
            <Container>
                <div>
                    <div>
                        <h3>Songs</h3>
                        {songs.map((song) => <h5 style={{cursor: "pointer"}} key={song.id} onClick={() => this.playChoose(song.id)}>{songs[this.state.current_song].id === song.id ? "▶" : null}{song.name}</h5>)}
                    </div>
                </div>
                <Wrapper>
                    <Padding>
                        <Left>
                            <ImageContainer src={songs[this.state.current_song].img}>
                                <Hole />
                            </ImageContainer>
                            <Details>
                                <Title>{this.convertTitle(songs[this.state.current_song].name)}</Title>
                                <Artist>{songs[this.state.current_song].artist}</Artist>
                            </Details>

                        </Left>
                        <SliderContainer>
                            <Time>{this.convertTime(this.state.current_time)}</Time>
                            <Slider type="range" name="slide" id="" value={this.state.current_time} onChange={this.handleSlide} min={0} max={this.state.song_duration}/>
                            <Time>{this.convertTime(this.state.song_duration)}</Time>
                        </SliderContainer>

                        <Controls>
                            <Previous className="fad fa-backward" onClick={this.prevSong} />
                            <PlayPause className={this.state.play ? "fad fa-pause" : "fad fa-play"} onClick={this.handlePlay}/>
                            <Next className="fad fa-forward" onClick={this.nextSong} />
                            <Rewind onClick={this.handleRewinds} className={this.state.repeat ? "fad fa-repeat" : this.state.repeat_once ? "fad fa-repeat-1-alt" : "fad fa-random"}/>
                            <Volume type="range" name="volume" min={0} max={1} step={0.0001} onChange={this.handleVolume}  />
                        </Controls>
                    </Padding>
                </Wrapper>
            </Container>
        )
    }
}

export default Player;

const Wrapper = styled.div`
    width: 100%;
    
    box-shadow: 0 -5px 10px rgba(0, 0, 0, .1);
`;
const Padding = styled.div`
    padding: 10px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const Left = styled.div`
    display: flex;
    justify-content: center;
`;
const Details = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
    
`;
const Title = styled.div`
    font-size: 17.5px;
    font-weight: bold;
    font-family: Poppins;
`;
const Artist = styled.div`
    font-size: 14px;
    margin-top: 0px;
`;
const Controls = styled.div`
    display: flex;
    align-items: center;
`;
const PlayPause = styled.i`
    font-size: 22.5px;
    margin: 0 25px;
    cursor: pointer;
`;
const Next = styled.i`
    font-size: 20px;
    cursor: pointer;
`;
const Previous = styled.i`
    font-size: 20px;
    cursor: pointer;
`;
const SeekBackward = styled.i`
    font-size: 20px;
    cursor: pointer;
`;
const SeekForward = styled.i`
    font-size: 20px;
    margin-left: 15px;
    cursor: pointer;
`;
const Volume = styled.input`
    -webkit-appearance: none;
      width: auto;
      height: 3px;
      background: #d3d3d3;
      outline: none;
      -webkit-transition: .2s;
      transition: opacity .2s;
      margin-left: 20px;
       cursor: pointer;
    
    
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #212121;
        cursor: pointer;
    }
`;
const Rewind = styled.i`
    font-size: 17.5px;
    cursor: pointer;
    margin-left: 50px;
`;
const SliderContainer = styled.div`
    display: flex;
    align-items: center;
    width: 45%; 
`;
const Slider = styled.input`
    -webkit-appearance: none;
      width: 100%;
      height: 3px;
      background: #d3d3d3;
      outline: none;
      -webkit-transition: .2s;
      transition: opacity .2s;
       margin: 0 20px;   
       border-radius: 999; 
       cursor: pointer;
    
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #212121;
        cursor: pointer;
    }
    
`;
const Time = styled.div`
    font-size: 13px;
    font-family: Poppins;
`;

const ImageContainer = styled.div`
    background: url(${props => props.src});
    background-position: 100% 100%;
    background-repeat: no-repeat;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: 0 10px 30px rgba(0, 0, 0, .1);
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Hole = styled.div`
    width: 17.5px;
    height: 17.5px;
    border: 2px solid #eee;
    border-radius: 50%;
    background: #fff;
`;

/**
 if ('mediaSession' in navigator) {

                console.log("yes");
                navigator.mediaSession.metadata = new MediaMetadata({ // eslint-disable-line no-use-before-define
                    title: songs[this.state.current_song].name,
                    artist: "me"
                });
                navigator.mediaSession.setActionHandler('play', this.handlePlay());
                navigator.mediaSession.setActionHandler('pause', this.handlePlay());
                navigator.mediaSession.setActionHandler('seekbackward', () => this.audio.currentTime = this.state.current_time - 10);
                navigator.mediaSession.setActionHandler('seekforward', () => this.audio.currentTime = this.state.current_time + 10);
                navigator.mediaSession.setActionHandler('previoustrack', this.prevSong());
                navigator.mediaSession.setActionHandler('nexttrack', this.nextSong());
            }
 **/
