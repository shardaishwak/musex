import React from "react";
import {
    Artist,
     Controls,
    Details,
    Hole,
    ImageContainer,
    Left, Next,
    Padding, PlayPause, Previous, Rewind,
    Slider,
    SliderContainer,
    Time,
    Title, Volume,
    Wrapper
} from "./Layout";

const Player = props =>  {

    const {
        songs,
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
        nextSong
    } = props;
    return(
        <>

            <Wrapper>
                <Padding>
                    <Left>
                        <ImageContainer src={songs[current_song].img}>
                            <Hole />
                        </ImageContainer>
                        <Details>
                            <Title>{convertTitle(songs[current_song].name)}</Title>
                            <Artist>{songs[current_song].artist}</Artist>
                        </Details>

                    </Left>
                    <SliderContainer>
                        <Time>{convertTime(current_time)}</Time>
                        <Slider type="range" name="slide" id="" value={current_time} onChange={handleSlide} min={0} max={song_duration}/>
                        <Time>{convertTime(song_duration)}</Time>
                    </SliderContainer>

                    <Controls>
                        <Previous className="fad fa-backward" onClick={prevSong} />
                        <PlayPause className={play ? "fad fa-pause" : "fad fa-play"} onClick={handlePlay}/>
                        <Next className="fad fa-forward" onClick={nextSong} />
                        <Rewind onClick={handleRewinds} className={repeat ? "fad fa-repeat" : repeat_once ? "fad fa-repeat-1-alt" : "fad fa-random"}/>
                        <Volume type="range" name="volume" min={0} max={1} step={0.0001} onChange={handleVolume}  />
                    </Controls>
                </Padding>
            </Wrapper>
        </>
    )
};

export default React.memo(Player);

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
