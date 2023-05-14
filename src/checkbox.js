import React, { Component } from 'react'
 
 export default class checkbox extends Component {
   constructor(props){
    super(props);
    this.state={
        checked : false,
    }
   }
    validchecked = () =>{
        this.setState({checked:!this.state.checked},()=>{
            this.props.checkfun( this.state.checked, this.props.id)
        })
    }
    
   render() {
     return (
        <input type="checkbox" checked={this.state.checked} onChange={this.validchecked} />
     )
   }
 }
 