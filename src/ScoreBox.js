import React, {Component} from 'react';
import './ScoreBox.scss'

class ScoreBox extends Component{

  state={
    players: [],
    cardCzarIdx: 0,
    currentRound: 1,
    rounds:3
  }

  componentDidMount(){
    this.setState({
      players: this.props.players,
      rounds: this.props.rounds,
      currentRound: this.props.currentRound,
      cardCzarIdx: this.props.cardCzar,
    })
  }

  componentDidUpdate(prevProps){
    if (this.props !== prevProps){
      this.setState({
        players: this.props.players,
        rounds: this.props.rounds,
        currentRound: this.props.currentRound,
        cardCzarIdx: this.props.cardCzar,
      });
    }
  }

  render(){
    const PlayerScore = this.state.players.map((player, idx) => {
      return(
        <div key={idx}>
          <p>
            <span className="player-name">{player.name} : </span>
            <span className="player-score">{player.score} - </span>
            {this.state.cardCzarIdx === idx ? <span>CardCzar</span> : <span></span>}
          </p>
        </div>
      )
    });

    return(
      <div id="score-box">
        <h3>Round: {this.state.currentRound}/{this.state.rounds}</h3>
        {PlayerScore}
      </div>
    )
  }
}

export default ScoreBox;
