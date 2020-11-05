import React, { Component } from "react";

export default class ProductGrid extends Component {
  render() {

    
    return (
      <div>
        back to catalog
        <h1>{this.props.name}</h1>
        <img src={this.props.img} alt="product img" />
        <h2>
          {this.props.type} ({this.props.material})
        </h2>
        <h2>
          Price: ${this.props.price} for {this.props.amount}
        </h2>
      </div>
    );
  }
}
