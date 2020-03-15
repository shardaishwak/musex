import styled from 'styled-components'

export const Wrapper = styled.div`
    width: 100%;
    z-index: 999;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, .1);
`;
export const Padding = styled.div`
    padding: 10px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
export const Left = styled.div`
    display: flex;
    justify-content: center;
`;
export const Details = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
    
`;
export const Title = styled.div`
    font-size: 17.5px;
    font-weight: bold;
    font-family: Poppins;
`;
export const Artist = styled.div`
    font-size: 14px;
    margin-top: 0px;
`;
export const Controls = styled.div`
    display: flex;
    align-items: center;
`;
export const PlayPause = styled.i`
    font-size: 22.5px;
    margin: 0 25px;
    cursor: pointer;
`;
export const Next = styled.i`
    font-size: 20px;
    cursor: pointer;
`;
export const Previous = styled.i`
    font-size: 20px;
    cursor: pointer;
`;
export const SeekBackward = styled.i`
    font-size: 20px;
    cursor: pointer;
`;
export const SeekForward = styled.i`
    font-size: 20px;
    margin-left: 15px;
    cursor: pointer;
`;
export const Volume = styled.input`
    -webkit-appearance: none;
      width: auto;
      height: 3px;
      background: linear-gradient(90deg, #212121 0% ${props => props.volume * 100}%, #d3d3d3 ${props => (props.volume) * 100}% 100%);
      outline: none;
      -webkit-transition: .2s;
      transition: opacity .2s;
      margin-left: 10px;
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
export const VolumeIcon = styled.i`
    font-size: 15px;
    cursor: pointer;
    margin-left: 50px;
`
export const Rewind = styled.i`
    font-size: 17.5px;
    cursor: pointer;
    margin-left: 50px;
`;

export const SliderContainer = styled.div`
    display: flex;
    align-items: center;
    width: 45%; 
`;
export const Slider = styled.input`
    -webkit-appearance: none;
      width: 100%;
      height: 3px;
     background: linear-gradient(90deg, #212121 0% ${props => (props.current_time / props.duration) * 100}%, #d3d3d3 ${props => (props.current_time / props.duration) * 100}% 100%);

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
export const Time = styled.div`
    font-size: 13px;
    font-family: Poppins;
`;

export const ImageContainer = styled.div`
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
export const Hole = styled.div`
    width: 17.5px;
    height: 17.5px;
    border: 2px solid #eee;
    border-radius: 50%;
    background: #fff;
`;
export const Icon = styled.i`
    margin-right: 10px;
    font-size: 30px;
    background: linear-gradient(${props => props.grad_one}, ${props => props.grad_two});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: flex;
    align-items: center;
    transition: .10s linear;
`
