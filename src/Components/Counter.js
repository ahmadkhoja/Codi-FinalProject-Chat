import React from 'react'

export default class Counter extends React.Component{
  state={ count: 0 }
  increment = () => this.setState({count:this.state.count+1})
  decrement = () => this.setState({count:this.state.count-1})
  render(){
    return (<span>
      <span>{this.state.count}</span>
      <button onClick={this.increment}>+</button>
      <button onClick={this.decrement}>-</button>
    </span>)
  }
}