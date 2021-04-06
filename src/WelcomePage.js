import React, {Component} from 'react';

class WelcomePage extends Component{

  state={
    players:[],
    numberOfPlayers: 3,
  }

  componentDidMount(){
    let playerList = ['','',''];

    this.setState({
      players: playerList,
    })
  }

  changePlayerCount = (evt) => {
    let playerList = this.state.players;
    if(evt.target.value > this.state.numberOfPlayers){
       playerList.push('')
    }else if(evt.target.value < this.state.numberOfPlayers){
      playerList.pop()
    }

    this.setState({
      numberOfPlayers: evt.target.value,
      players: playerList,
    })
  }

  startGame = () => {
    let players = this.state.players;

    for(let idx in players){
      if(players[idx] === ''){
        return;
      }
    }
    console.log("Starting Game")
  }

  changePlayerName = (evt, idx) => {
    let playerList = this.state.players;
    playerList[idx] = evt.target.value;

    this.setState({
      players: playerList,
    })
  }

  render(){
    const PlayerInputs = this.state.players.map((player, idx) => {
      return(
        <div key={idx}>
          <form action="">
            <label htmlFor="">Playername: </label>
            <input type="text" onChange={(e) => this.changePlayerName(e, idx)}/>
          </form>
        </div>
      )
    });

    return(
      <div>
        <h2>Welcome to Cards Against Humanity</h2>
        <form action="">
          <label htmlFor="">Number of players</label>
          <input type="number" id="quantity" name="quantity" min="3" max="6" onChange={this.changePlayerCount}/>
        </form>
        <input type="button" value="Start Game" onClick={this.startGame}/>
        {PlayerInputs}
      </div>
    )
  }
}

export default WelcomePage;
