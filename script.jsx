//Will come back to simplify the code later

const AUDIO = {
    A4:'https://github.com/bszmclh/pianosim/blob/main/notes/ff-A4.mp3?raw=true',
    B3:'https://github.com/bszmclh/pianosim/blob/main/notes/ff-B3.mp3?raw=true',
    B4:'https://github.com/bszmclh/pianosim/blob/main/notes/ff-B4.mp3?raw=true',
    C4:'https://github.com/bszmclh/pianosim/blob/main/notes/ff-C4.mp3?raw=true',
    C5:'https://github.com/bszmclh/pianosim/blob/main/notes/ff-C5.mp3?raw=true',
    D4:'https://github.com/bszmclh/pianosim/blob/main/notes/ff-D4.mp3?raw=true',
    E4:'https://github.com/bszmclh/pianosim/blob/main/notes/ff-E4.mp3?raw=true',
    F4:'https://github.com/bszmclh/pianosim/blob/main/notes/ff-F4.mp3?raw=true',
    G4:'https://github.com/bszmclh/pianosim/blob/main/notes/ff-G4.mp3?raw=true'
}

const keyMap = {
    65:{ 
    keyTrigger: 'A',
    id: 'B3',
    url: AUDIO.B3
    },
    83:{ 
    keyTrigger: 'S',
    id: 'C4',
    url: AUDIO.C4
    },
    68:{ 
    keyTrigger: 'D',
    id: 'D4',
    url: AUDIO.D4
    },
    70:{ 
    keyTrigger: 'F',
    id: 'E4',
    url: AUDIO.E4
    },
    71:{ 
    keyTrigger: 'G',
    id: 'F4',
    url: AUDIO.F4
    },
    72:{ 
    keyTrigger: 'H',
    id: 'G4',
    url: AUDIO.G4
    },
    74:{ 
    keyTrigger: 'J',
    id: 'A4',
    url: AUDIO.A4
    },
    75:{ 
    keyTrigger: 'K',
    id: 'B4',
    url: AUDIO.B4
    },
    76:{ 
    keyTrigger: 'L',
    id: 'C5',
    url: AUDIO.C5
    }
}

const templink = 'https://cdn.pixabay.com/download/audio/2021/07/27/audio_202082aa0b.mp3?filename=in-the-forest-ambient-acoustic-guitar-instrumental-background-music-for-videos-5718.mp3'


class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            power: true,
            vol: 50,
            currentKey:'',
            name: ''
        }
        this.handleVolChange = this.handleVolChange.bind(this);
        this.handlePower = this.handlePower.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleClick = this.handleClick.bind(this);
        

    }

    componentDidMount() {
            document.addEventListener("keydown", this.handleKeyDown);
            document.addEventListener("keyup", this.handleKeyUp);
        }
    componentWillUnmount() {
            document.removeEventListener("keydown", this.handleKeyDown);
            document.addEventListener("keyup", this.handleKeyUp);

        }


    handleKeyDown(e){
        if(e.keyCode in keyMap && this.state.power){
            this.setState({
                currentKey: keyMap[e.keyCode].keyTrigger,
                name: keyMap[e.keyCode].id
            })

            let audio = document.getElementById(this.state.currentKey);
            audio.currentTime = 0;
            audio.play();
            $("#"+keyMap[e.keyCode].id).addClass('pressed');
        }

    }

    handleKeyUp(e){
        if(e.keyCode in keyMap){
            $("#"+keyMap[e.keyCode].id).removeClass('pressed');
        }

    }

    
    handleVolChange(e){
        this.setState({
            vol: e.target.value
        })
        let audio = document.getElementsByClassName('notes');
        for(let i = 0; i<audio.length; i++){
            audio[i].volume = this.state.vol/100;
        }

    }

    handlePower(){
        this.setState(state =>({
            power: !state.power
        }))
        if(this.state.power){
            $('#toggle').css('animation-name', 'turnOff')
            $('#toggleBar').css('animation-name', 'backgroundOff')
        }else{
            $('#toggle').css('animation-name', 'turnOn')
            $('#toggleBar').css('animation-name', 'backgroundOn')
        }
    }

    handleClick(e){
        if(this.state.power){
            $("#"+e.target.id).addClass('pressed');
        setTimeout(()=>{
            $("#"+e.target.id).removeClass('pressed');
        }, 300)
        let keyPressed = Object.values(keyMap).filter(d => d.id == e.target.id)[0].keyTrigger
        this.setState({
            currentKey: keyPressed,
                name: e.target.id
        })
        let audio = document.getElementById(keyPressed);
            audio.currentTime = 0;
            audio.play();
        }

    }
    


    render(){
        if(this.state.power){
            $('#display').css('color', 'black')
        }else{
            $('#display').css('color', 'rgb(158, 158, 158)')
        }
        return (
            <div id='drum-machine'>
            <h1 id='title'>SIMPLE PIANO Ver1.0</h1>
            <div id='cover'>
            <div id='power'>
            <p className='label'>POWER</p>
            <div id='toggleBar' onClick={this.handlePower}>
            <i class="fas fa-circle" id='toggle'></i>
            
            </div>
            
            </div>
            <div id='display'>

                {this.state.name}
                
            </div>
            <div id='volume-control'>
            <p className='label'>VOLUME</p>
            <input id="slider" type="range" min="0" max="100" onChange={this.handleVolChange} value={this.state.vol}></input>

            </div>
            </div>

            
            <div id='drum-pad'>
                <div className='drum-pad left-end'>
                </div>
                <div className='drum-pad' id={keyMap[65].id} onClick={this.handleClick}>
                <p className='keyName'>A</p>
                <audio id='A' className='notes' src={keyMap[65].url} type="audio/mpeg" />
                </div>

                <div className='drum-pad' id={keyMap[83].id} onClick={this.handleClick}>
                <p className='keyName'>S</p>
                <audio id='S' className='notes' src={keyMap[83].url} type="audio/mpeg" />
                </div>

                <div className='drum-pad'id={keyMap[68].id} onClick={this.handleClick}>
                <p className='keyName'>D</p>
                <audio id='D' className='notes' src={keyMap[68].url} type="audio/mpeg" />
                </div>

                <div className='drum-pad'id={keyMap[70].id} onClick={this.handleClick}>
                <p className='keyName'>F</p>
                <audio id='F' className='notes' src={keyMap[70].url} type="audio/mpeg" />
                </div>

                <div className='drum-pad'id={keyMap[71].id} onClick={this.handleClick}>
                <p className='keyName'>G</p>
                <audio id='G' className='notes' src={keyMap[71].url} type="audio/mpeg" />
                </div>

                <div className='drum-pad'id={keyMap[72].id} onClick={this.handleClick}>
                <p className='keyName'>H</p>
                <audio id='H' className='notes' src={keyMap[72].url} type="audio/mpeg" />
                </div>

                <div className='drum-pad'id={keyMap[74].id} onClick={this.handleClick}>
                <p className='keyName'>J</p>
                <audio id='J' className='notes' src={keyMap[74].url} type="audio/mpeg" />
                </div>

                <div className='drum-pad'id={keyMap[75].id} onClick={this.handleClick}>
                <p className='keyName'>K</p>
                <audio id='K' className='notes' src={keyMap[75].url} type="audio/mpeg" />
                </div>

                <div className='drum-pad'id={keyMap[76].id} onClick={this.handleClick}>
                <p className='keyName'>L</p>
                <audio id='L' className='notes' src={keyMap[76].url} type="audio/mpeg" />
                </div>

                <div className='drum-pad right-end'>
                </div>
            </div>

            <p id="footer"> by bszmclh </p>
            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('container'))