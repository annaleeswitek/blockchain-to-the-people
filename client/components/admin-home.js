import React, { Component } from 'react'

export default class AdminHome extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      startDate: '',
      endDate: ''
    }
  }

  render () {
    return (
      <div>
        <h1>New Election</h1>
          <form>
            <label>Name</label>
            <input type= "text" />
          </form>
          <button>Submit</button>
      </div>
  )
  }
}
