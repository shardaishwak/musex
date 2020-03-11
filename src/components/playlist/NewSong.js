import React from "react";
import styled from "styled-components";
import {
    Artist, Controls,
    Details,
    Hole,
    ImageContainer,
    Left, Next,
    Padding, PlayPause, Previous, Rewind,
    Slider,
    SliderContainer,
    Time,
    Title, Volume, VolumeIcon
} from "../player/Layout";

const Topper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 25px;
    
    i {cursor: pointer}
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px 50px;
`
const Overlay = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: #fff;
    z-index: 10;
`;
const Progress = styled.div`
    background: linear-gradient(90deg, ${props => props.status === "running" ? "orange" : props.status === "completed" ? "green" : props.status === "cancelled" ? "red" : "blue"} 0% ${props => props.process}%, #fff ${props => props.process}% 100%);
    height: 5px;
    transition: width .1s linear; 
`;
const Form = styled.form`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    
    label {
        width: 100%;
        height: 100%;
        padding: 50px 0;
        border-radius: 5px;
        border: 2px dashed #212121;
        font-family: Poppins;
        text-transform: uppercase;
        color: #212121;
        text-align: center;
        
        
        i {
            font-size: 20px;
            margin-right: 10px;
        }
    }
    input {display: none}
`
const Upload = styled.div`
    padding: 10px 20px;
    background: #212121;
    color: #fff;
    border-radius: 5px;
    font-family: Poppins;
    cursor: pointer;
    font-size: 13px;
    text-transform: uppercase;
`
const Cancel = styled.div`
    font-size: 13px;
    width: 25px;
    border-radius: 50%;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #21212120;
    color: #212121;
    cursor: pointer;
    margin-left: 15px;
`
const Center = styled.div`
    display: flex;
    align-items: center;
`
const NewSong = props => {
    const preventDef = e => {
        e.preventDefault()
    }
    const {handleFile, status, progress, file_info, handleTitle, handleArtist, handleCancel, handleFileSubmit, file, cancel, uploading, error, toggle, handleDrop, deleteCurrentFile} = props
    console.log(status)
    return(
        <Overlay>
            <Progress status={status} process={progress} />
            <Wrapper>
                <Topper>
                    <h2>Add Music</h2>
                    {!uploading ? <i className={"fad fa-times"} onClick={toggle}/> : null}
                </Topper>
                {!file ? <Form>
                    <label htmlFor="file" onDrop={handleDrop} onDragOver={preventDef}><i className={"fad fa-cloud-upload-alt"}></i> Upload file or drop here</label>
                    <input type="file" accept={".mp3,audio/*"} name="file" id="file"  onChange={handleFile}/>
                </Form> : null}
                {file ? <Wrapper>
                    <Padding>
                        <Left>
                            <ImageContainer src="https://images.unsplash.com/photo-1487088678257-3a541e6e3922?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80">
                                <Hole />
                            </ImageContainer>
                            <Details>
                                <Title>{file_info.title.slice(0, -file.type.split("/")[1].length - 1).split("-")[1] || file_info.title.slice(0, -file.type.split("/")[1].length - 1)}</Title>
                                <Artist>{file_info.artist}</Artist>
                            </Details>

                        </Left>
                        <Controls>
                            {!uploading ? <Center><Upload onClick={handleFileSubmit}>Upload </Upload><Cancel onClick={deleteCurrentFile}><i className={"far fa-times"}/></Cancel></Center> : null}
                            {uploading ?
                                <Center><p>Uploading</p> <Cancel onClick={handleCancel}><i className={"far fa-times"}/></Cancel></Center>
                             : null}
                        </Controls>
                    </Padding>
                </Wrapper> : null}
            </Wrapper>
        </Overlay>
    )
}

export default NewSong