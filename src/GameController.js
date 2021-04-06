import React, {Component} from 'react';

import ScoreBox from './ScoreBox';
import './Game.scss';
import BlackCard from './BlackCard';
import PlayerCards from './PlayerCards';
import CardCzarCards from './CardCzarCards';

import BlackCards from './BlackCards.json';
import WhiteCards from './WhiteCards.json';

Array.prototype.remove = function() {
  var what, a = arguments, L = a.length, ax;
  while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
          this.splice(ax, 1);
      }
  }
  return this;
};

class GameController extends Component{

  state={
    players: [],
    cardCzarIdx: 0,
    rounds: 3,
    currentRound: 1,
    currentPlayer: 1,
    whiteCardDeck: WhiteCards,
    blackCardDeck: BlackCards,
    chosenCards: [],
    blackCard: {},
    intermidiateState: true,
    currentPlayerCards: [],
  }

  componentDidMount(){
    this.selectBlackCard();



    let numberOfPlayers = 3;
    let players = [];
    let playerNames = ["Theis", "Bob", "Ann"];

    for(let i = 0; i < playerNames.length; i++){
      players.push(this.instantiatePlayer(playerNames[i]));
    }


    this.setState({
      players: players,
    });

  }

  selectBlackCard = () => {

    let blackCardIdx = Math.floor(Math.random() * (this.state.blackCardDeck.length-1)) + 1;
    let blackCardDeck = this.state.blackCardDeck;
    let blackCard = blackCardDeck[blackCardIdx];

    blackCardDeck = blackCardDeck.remove(blackCard);

    this.setState({
      blackCard: blackCard,
      blackCardDeck: blackCardDeck,
    });
  }



  instantiatePlayer = (name) =>{
    return {
      "name": name,
      "score": 0,
    }
  }

  updateScore = (idx) =>{
    let players = this.state.players;
    players[idx].score += 1;

    this.setState({
      players: players,
    })
  }

  updateCardCzar = () =>{


    this.selectBlackCard()
    let cardCzarIdx = this.state.cardCzarIdx;
    let currentRound = this.state.currentRound;
    if(this.state.cardCzarIdx === this.state.players.length-1){
      cardCzarIdx = 0;
      currentRound += 1;
    }else{
        cardCzarIdx = this.state.cardCzarIdx + 1;
    }

    let currentPlayer = cardCzarIdx;
    if(currentPlayer === this.state.players.length-1){
      currentPlayer = 0;
    }else{
        currentPlayer = cardCzarIdx + 1;
    }

    // Game Ends when currentRound is bigger than rounds
    if(currentRound > this.state.rounds){
      console.log("The winner is: ")
    }else{
      this.setState({
        cardCzarIdx: cardCzarIdx,
        currentRound: currentRound,
        intermidiateState: true,
        currentPlayer: currentPlayer,
        chosenCards: [],
      })
    }
  }

  turnCards = () =>{
    if(this.state.cardCzarIdx !== this.state.currentPlayer){
      let fetchedCards = [];
      let indexesChosen = [];
      let whiteCardDeck = this.state.whiteCardDeck;
      let i = 0;
      while(i < 8){
        let whiteCardIdx = Math.floor(Math.random() * (whiteCardDeck.length-1)) + 1;
        if(!indexesChosen.includes(whiteCardIdx)){
          indexesChosen.push(whiteCardIdx);
          let whiteCard = whiteCardDeck[whiteCardIdx];

          // whiteCardDeck = whiteCardDeck.remove(whiteCard);

          fetchedCards.push(whiteCard);
          i++;
        }
      }
      this.setState({
        intermidiateState: !this.state.intermidiateState,
        currentPlayerCards: fetchedCards,
        whiteCardDeck: whiteCardDeck,
      })
    }else{
      this.setState({
        intermidiateState: !this.state.intermidiateState,
      })
    }
  }

  chosenCards = (chosenIdx) =>{
    let chosenCards = this.state.chosenCards;
    let currentPlayer = this.state.currentPlayer;

    let playerCardsChosen = {
      player: this.state.players[currentPlayer],
      cards: [],
    }

    for(let i = 0; i < chosenIdx.length; i++){
      playerCardsChosen.cards.push(this.state.currentPlayerCards[chosenIdx[i]]);
    }

    chosenCards.push(playerCardsChosen);

    if(currentPlayer === this.state.players.length-1){
      currentPlayer = 0;
    }else{
      currentPlayer++;
    }

    this.setState({
      chosenCards: chosenCards,
      intermidiateState: true,
      currentPlayer: currentPlayer,
    })
  }

  winnerChosen = (player) => {
    let winnerIdx = -1;

    for(let i = 0; i < this.state.players.length; i++){
      if(this.state.players[i].name === player.name){
        winnerIdx = i;
      }
    }
    this.updateScore(winnerIdx);
    this.updateCardCzar();
  }

  render(){


    return(
      <div>
        <div id="game-header">
          <ScoreBox players={this.state.players}
                    cardCzar={this.state.cardCzarIdx}
                    currentRound={this.state.currentRound}
                    rounds={this.state.rounds}/>
          <BlackCard blackCard={this.state.blackCard} />
          <div id="title-container">
            <h3>Cards Against Humanity</h3>
            <p>{this.state.players[this.state.currentPlayer] !== undefined ? this.state.players[this.state.currentPlayer].name : null}</p>
          </div>
        </div>
        {this.state.intermidiateState ? <div onClick={this.turnCards} className="btn">Turn cards</div> : null}
        {this.state.currentPlayer !== this.state.cardCzarIdx  && !this.state.intermidiateState ?
        <PlayerCards playerCards={this.state.currentPlayerCards}
                     numberOfCardsToChoose={this.state.blackCard.count}
                     chosenCards={(idx) => this.chosenCards(idx)}/> : null}
        {this.state.currentPlayer === this.state.cardCzarIdx && !this.state.intermidiateState ?
        <CardCzarCards chosenCards={this.state.chosenCards}
                       winnerChosen={(card) => this.winnerChosen(card)}/> : <div></div>}
      </div>
    )
  }

}

export default GameController;
