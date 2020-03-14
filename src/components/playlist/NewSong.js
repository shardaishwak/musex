import React from "react";
import {connect} from "react-redux";
import {AddSong, CancelUploadSong} from "../../store/actions/songsActions";
import styled from "styled-components";

const Overflow = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    top: 0;
    background: #fff;
    z-index: 10;
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
        return (
            <Overflow>
                <label htmlFor="file" onDrop={this.handleDrop} onDragOver={(e) => e.preventDefault()}>File</label>
                <input type="file" name="file" id="file" accept={".mp3,audio/*"} onChange={this.handleFile}/>
                <button onClick={this.handleDeleteFile} disabled={!this.state.file}>Delete file</button>
                {this.props.uploading ? <button onClick={this.handleCancel}>Cancel</button> : <button onClick={this.uploadFile} disabled={!this.state.file}>Upload</button>}
                {this.props.progress.toFixed(0)}%
            </Overflow>
        )
    }
}

const mapStateToProps = state => {
    return {
        uploading: state.songs.uploading,
        progress: state.songs.progress
    }
}

export default connect(mapStateToProps, {AddSong: AddSong, CancelUploadSong: CancelUploadSong})(NewSong)