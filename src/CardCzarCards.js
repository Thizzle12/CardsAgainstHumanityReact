import React, {Component} from 'react';


class CardCzarCards extends Component{


  chooseWinner = (player) => {
    this.props.winnerChosen(player)
  }

  shuffle = (a) => {
      for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
  }

  render(){
    const PlayerMapping = this.shuffle(this.props.chosenCards).map((playerChoice, idx) =>{

        const CardMapping = playerChoice.cards.map((card, idx) => {
          return(
              <p
                   key={idx}>{card.text}
              </p>
          )
        })

      return(
        <div className="white-card card" key={idx} onClick={() => this.chooseWinner(playerChoice.player)}>
          {CardMapping}
        </div>
      )
    })

    return(
      <div className="player-cards-container">
        {PlayerMapping}
      </div>
    )
  }
}

export default CardCzarCards;
