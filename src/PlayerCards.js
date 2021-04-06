import React, {Component} from 'react';

class PlayerCards extends Component{

  state={
    chosenCards: [],
    numberOfCardsToChoose: 1,
    wrongAmountOfCards: false
  }

  componentDidMount(){
    this.setState({
      numberOfCardsToChoose: this.props.numberOfCardsToChoose
    })
  }

  chooseCard = (idx) => {
    let tempList = this.state.chosenCards;

    if(!this.state.chosenCards.includes(idx) && this.state.chosenCards.length < this.state.numberOfCardsToChoose){
      tempList.push(idx);
    }else if(this.state.chosenCards.includes(idx)){
      tempList.remove(idx);
    }else{
      tempList.shift();
      tempList.push(idx);
    }

    this.setState({
      chosenCards: tempList,
      wrongAmountOfCards: false,
    });
  }

  finalChoise = () => {
    if (this.state.chosenCards.length !== this.state.numberOfCardsToChoose) {
      this.setState({
        wrongAmountOfCards: true
      })
    }else{
      this.props.chosenCards(this.state.chosenCards);
    }
  }

  render(){


    const PlayerCardMapping = this.props.playerCards.map((card, idx) => {
      return(
        <div className={!this.state.chosenCards.includes(idx) ? "white-card card" : "white-card card chosen-card"}
             key={idx}
             onClick={() => this.chooseCard(idx)}>
          <p>{card.text}</p>
        </div>
      )});

    return(
      <div className="player-cards-container">
        <div onClick={this.finalChoise} className="btn">I have chosen cards</div>
        {this.state.wrongAmountOfCards ? <div>You have chosen a wrong amount of cards</div>: null}
        {PlayerCardMapping}
      </div>
    )
  }

}

export default PlayerCards;
