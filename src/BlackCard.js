import React, {Component} from 'react';


class BlackCard extends Component{

  render(){

    return(
      <div id="black-card-container">
        <div className="black-card card">
          <p>{this.props.blackCard.text}</p>
        </div>
      </div>
    )
  }
}

export default BlackCard;
