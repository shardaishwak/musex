import React from 'react';
import styled from 'styled-components'
import Player from "../player";
import Playlist from "../playlist";
import Unsplash from "unsplash-js";

/*
import song1 from "../../music/DROELOE - Sunburn (Official Audio).mp3";
import song2 from "../../music/Anne-Marie - BIRTHDAY.mp3";
import song3 from "../../music/Kehlani - Gangsta (from Suicide Squad - The Album) [Official Video].mp3";
import song4 from "../../music/twenty one pilots - Heathens.mp3";
import song5 from "../../music/San Holo - Surface (feat. Caspian).mp3";
import cover from "../../images/flowers.jpg";
import song6 from "../../music/Aero Chord - ANTHEM.mp3";
import song7
    from "../../music/Biometrix & Sarah De Warren - Harley Fvcking Quinn (ft. Marcus) [Magic x Nightblue Release].mp3";
import song8 from "../../music/Sickick - Infected (Barren Gates Remix).mp3";
*/

import * as firebase from "firebase";

const unsplash = new Unsplash({
    accessKey: "WRKuTbvzfVmllgZmlH6lVD4tH6kyowy_kU39ndpjnG8"
})

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

        add_new: false,
        file: "",
        file_info: {
            title: "",
            artist: "unknown",
            cover: "https://images.unsplash.com/photo-1508726295872-0b87b9999406?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80"
        },
        error: null,
        progress: 0,
        status: null,
        cancel: false,
        uploading: false
    };
    audio = new Audio();
    async componentDidMount() {


        //  Add fetched music
        await this.setState({songs: this.props.songs});
        //  Windows handlers
        window.addEventListener("keydown", (e) => {
            if (e.ctrlKey && e.keyCode === 80 && e.shiftKey) {
                this.handlePlay()
            }
        });
        if (this.state.songs) {
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
        const song = this.state.songs[index];
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
    toggleAddMusic = () => this.setState({add_new: !this.state.add_new});
    handleFile = e => this.setState({file: e.target.files[0], file_info: {title: e.target.files[0].name, artist: e.target.files[0].name.split("-")[0]}});
    handleTitle = e => this.setState({file_info: {title: e.target.value, artist: this.state.file_info.artist}});
    handleArtist = e => this.setState({file_info: {title: this.state.file_info.title, artist: e.target.value}});
    handleFileSubmit = async e => {
        const currentUser = firebase.auth().currentUser;
        const storageRef = firebase.storage().ref();
        const firestore = firebase.firestore();
        this.setState({uploading: true, cancel: false, status: "running", process: 0, error: null});
        const filetype = "." + this.state.file.type.split("/")[1];
        const filename = this.state.file.name.slice(0, -filetype.length).split("-")[1] || this.state.file.name;
        const file = this.state.file;
        const metatdata = {contentType: filetype};

        let image_url;
        await unsplash.photos.getRandomPhoto().then(res => res.json()).then(json => image_url = json.urls.small)

        const uploadTask = storageRef.child("music/" + filename).put(file, metatdata);
        uploadTask
            .on('state_changed', (snapshot) => {

                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
                this.setState({progress});
                if (this.state.cancel) {
                    this.setState({status: "cancelled"});
                    uploadTask.cancel();

                }
                if (snapshot.state === "running") this.setState({status: "running"})
            }, (err) => {
                this.setState({error: err.code});
            }, () => {
                uploadTask.snapshot.ref
                    .getDownloadURL()
                    .then(downloadURL => {
                        firestore
                            .collection("users")
                            .doc(currentUser.uid)
                            .get()
                            .then(doc => {
                                const lastSongs = doc.data().songs;
                                const at_song = {
                                    title: filename,
                                    full_name: this.state.file.name,
                                    type: this.state.file.type,
                                    artist: this.state.file_info.artist,
                                    url: downloadURL,
                                    img: image_url,
                                    id: new Date().valueOf()
                                };
                                //  Set ne song to the list, move all to app.js
                                console.log(at_song);
                                if (lastSongs) {
                                    const newSongs = [...lastSongs, at_song];
                                    firestore
                                        .collection("users")
                                        .doc(currentUser.uid)
                                        .update({songs: newSongs})
                                        .then(() => {
                                            this.setState({uploading: false, status: "completed", songs: [...this.state.songs, at_song]});

                                            setTimeout(() => this.setState({add_new: !this.state.add_new, process: 0, error: null,cancel: false}), 700)
                                        })
                                        .catch(err => console.log(err))
                                } else {
                                    firestore
                                        .collection("users")
                                        .doc(currentUser.uid)
                                        .update({songs: [at_song]})
                                        .then(() => {
                                            this.setState({uploading: false, status: "completed", songs: [at_song]});
                                            setTimeout(() => this.setState({add_new: !this.state.add_new, process: 0, error: null,cancel: false}), 700)
                                        })
                                        .catch(err => console.log(err))
                                }
                            })
                    })
            })
    };
    handleCancel = () => this.setState({cancel: true});

    Logout = async () => {
        this.audio.pause()
        await firebase.auth()
            .signOut()
            .catch(err =>  this.setState({loading: false, error: err.message}))
    };

    render() {
        if (process.env.NODE_ENV === "development") console.log(this.state);
        const sorted_songs = this.state.songs ? this.state.songs.sort((a,b) => {
            const title_a = a.title.toLowerCase(), title_b = b.title.toLowerCase();
            if (title_a < title_b) return -1;
            else return 1;
        }) : [];
        return(
            <Container>
                <Playlist
                    songs={sorted_songs}
                    playChoose={this.playChoose}
                    current_song={this.state.current_song}
                    shuffle={this.shuffle}
                    add_new={this.state.add_new}
                    file={this.state.file}
                    file_info={this.state.file_info}
                    error={this.state.error}
                    progress={this.state.progress}
                    status={this.state.status}
                    cancel={this.state.cancel}
                    uploading={this.state.uploading}
                    toggleAddMusic={this.toggleAddMusic}
                    handleFile={this.handleFile}
                    handleTitle={this.handleTitle}
                    handleArtist={this.handleArtist}
                    handleFileSubmit={this.handleFileSubmit}
                    handleCancel={this.handleCancel}
                    Logout={this.Logout}
                />

                <Player
                    songs={sorted_songs}
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

export default Main;
