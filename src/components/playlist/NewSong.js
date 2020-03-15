import React from "react";
import {connect} from "react-redux";
import {AddSong, CancelUploadSong} from "../../store/actions/songsActions";
import styled from "styled-components";
import gradients from "../../gradients";

const Overflow = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    top: 0;
    background: #fff;
    z-index: 10;
`
const Wrapper = styled.div`
    padding: 50px 100px;
    display: flex;
    flex-direction: column;
`
const Topper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50px;
    
    .title {
        font-size: 30px;
        font-weight: bold;
    }
    i {
        font-size: 17.5px;
    }
`
const Label = styled.label`
    padding: 50px 0;
    text-align: center;
    width: 100%;
    border: 2px dashed #212121;
    border-radius: 7.5px;
    font-size: 17px;
    font-family: Poppins;
    opacity: .7;
    cursor: pointer;
`
const Input = styled.input`
    display: none;
`
const Detailer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    border: 2px solid ${gradients[1].colors[0]};
    border-radius: 10px;
`
const Left = styled.div`
    display: flex;
    align-items: center;
    
    i {
        font-size: 30px;
        color: #212121;
        margin-right: 10px;
        background: linear-gradient(${gradients[1].colors[0]}, ${gradients[1].colors[1]});
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`
const Next = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
    
    .title {
        font-size: 17.5px;
        font-weight: bold;
        font-family: Poppins;
    }
    .artist {
        font-size: 14px;
        margin-top: 0px;
        font-family: Poppins;
    }
`
const Right = styled.div`
    display: flex;
    align-items: center;
    
`
const Cancel = styled.div`
    width: 25px;
    height: 25px;
    background: #eee;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 3px 5px rgba(0, 0, 0, .1);
    cursor: pointer;
    
    i {
        font-size: 13px;
        color: #212121;
    }
`
const Progress = styled.div`
    background: linear-gradient(90deg, #212121 0% ${props => props.progress}%, #d3d3d3 ${props => props.progress}% 100%);
    height: 3px;
    border-radius: 999px;
    width: 200px;
    margin-right: 30px;
`
const Upload = styled.div`
    padding: 7.5px 15px;
    margin-right: 30px;
    font-size: 13px;
    font-family: Poppins;
    text-transform: uppercase;
    background: #212121;
    color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, .1);
    cursor: pointer;
`




class NewSong extends React.PureComponent {
    state = {file: null}
    handleFile = (e) => {
        this.setState({file: e.target.files[0]})
    }
    handleDrop = (e) => {
        this.setState({file: e.dataTransfer.items[0].getAsFile()})
    }
    handleDeleteFile = () => this.setState({file: null})
    uploadFile = async () => {
        this.props.AddSong(this.state.file)
    }
    handleCancel = () => this.props.CancelUploadSong()
    render() {
        const toggleAddSong = this.props.toggleAddSong
        const filetype = this.state.file ? "." + this.state.file.type.split("/")[1] : null;
        const filename = this.state.file ?  this.state.file.name.slice(0, -filetype.length).split("-")[1] || this.state.file.name : null;
        const fileartist = this.state.file ?  this.state.file.name.slice(0, -filetype.length).split("-")[0] || this.state.file.name : null;

        if (this.props.status === "completed") {
            toggleAddSong();
        }
        return (
            <Overflow>
                <Wrapper>
                    <Topper>
                        <div className="title">New Song</div>
                        <i className={"fad fa-times"} onClick={toggleAddSong}/>
                    </Topper>
                    {this.state.file ? <>
                        <Detailer>
                            <Left>
                                <i className={"fas fa-music"}/>
                                <Next>
                                    <div className="title">{filename}</div>
                                    <div className="artist">{fileartist}</div>
                                </Next>
                            </Left>
                            <Right>
                                {this.props.uploading ? <>
                                    <Progress progress={this.props.progress}/>
                                    <Cancel onClick={this.handleCancel}><i className={"far fa-times"}/></Cancel>
                                </> : <>
                                    <Upload onClick={this.uploadFile}>Upload</Upload>
                                    <Cancel onClick={this.handleDeleteFile}><i className={"far fa-times"}/></Cancel>
                                </>}

                            </Right>
                        </Detailer>
                    </> : <>
                        <Label htmlFor="file" onDrop={this.handleDrop} onDragOver={(e) => e.preventDefault()}>Click to browse file or drop here</Label>
                        <Input type="file" name="file" id="file" accept={".mp3,audio/*"} onChange={this.handleFile}/>
                    </>}
                </Wrapper>
            </Overflow>
        )
    }
}

const mapStateToProps = state => {
    return {
        uploading: state.songs.uploading,
        progress: state.songs.progress,
        status: state.songs.status
    }
}

export default connect(mapStateToProps, {AddSong: AddSong, CancelUploadSong: CancelUploadSong})(NewSong)