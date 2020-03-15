import React from "react";
import {
    Artist,
    Controls,
    Details,
    Hole, Icon,
    ImageContainer,
    Left, Next,
    Padding, PlayPause, Previous, Rewind,
    Slider,
    SliderContainer,
    Time,
    Title, Volume, VolumeIcon,
    Wrapper,
} from "./Layout";
import gradients from "../../gradients";
import {connect} from "react-redux";

const Player = props =>  {

    const {

        play,
        currentSong,
        song_duration,
        current_song,
        current_time,
        repeat,
        repeat_once,
        random_next,
        playSong,
        handlePlay,
        handleVolume,
        handleSlide,
        handleRewinds,
        convertTime,
        convertTitle,
        prevSong,
        nextSong,
        volume,
        toggleMute
    } = props;
    const rand = Math.floor(Math.random() * gradients.length);
    const sorted_songs = props.songs.length > 0 ? props.songs.sort((a,b) => {
        const title_a = a.title.toLowerCase(), title_b = b.title.toLowerCase();
        if (title_a < title_b) return -1;
        else return 1;
    }) : [];
    const current_song_index = sorted_songs.findIndex(i => i.id === current_song)
    return(
        <>
            {sorted_songs.length > 0 && current_song !== null  ?
                <Wrapper>
                    <Padding>
                        <Left>
                            <Icon className={"fas fa-music"}  grad_one={gradients[rand].colors[0]}  grad_two={gradients[rand].colors[1]} />
                            <Details>
                                <Title>{convertTitle(sorted_songs[current_song_index].title)}</Title>
                                <Artist>{convertTitle(sorted_songs[current_song_index].artist)}</Artist>
                            </Details>

                        </Left>
                        <SliderContainer>
                            <Time>{convertTime(current_time)}</Time>
                            <Slider type="range" name="slide" id="" value={current_time} onChange={handleSlide} min={0} max={song_duration} current_time={current_time} duration={song_duration}/>
                            <Time>{convertTime(song_duration)}</Time>
                        </SliderContainer>

                        <Controls>
                            <Previous className="fad fa-backward" onClick={prevSong} />
                            <PlayPause className={play ? "fad fa-pause" : "fad fa-play"} onClick={handlePlay}/>
                            <Next className="fad fa-forward" onClick={nextSong} />
                            <Rewind onClick={handleRewinds} className={repeat ? "fad fa-repeat" : repeat_once ? "fad fa-repeat-1-alt" : "fad fa-random"}/>
                            <VolumeIcon className={volume > 0 ? "fad fa-volume-up" : "fad fa-volume-mute"} onClick={toggleMute}/>
                            <Volume type="range" name="volume" min={0} max={1} value={volume} step={0.0001} onChange={handleVolume} volume={volume} />
                        </Controls>
                    </Padding>
                </Wrapper>
                : null}
        </>
    )
};
const mapStateToProps = state => {
    return {
        songs: state.songs.songs
    }
}
export default connect(mapStateToProps, null)(React.memo(Player));

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
