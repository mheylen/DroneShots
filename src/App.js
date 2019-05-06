import React, { Component } from "react";
import Header from "./components/Header";
import { Switch, Route } from "react-router-dom";
import PilotCard from "./components/PilotCard";
import Dashboard from "./components/Dashboard";
import editVideo from "./components/editVideo"
import "./App.css";
import Axios from "axios";


class App extends Component {
  constructor() {
    super()
    this.state ={
      contentList: [],
      content: []
    };
    this.onToken = this.onToken.bind(this);
  };

  onToken(token) {
    console.log('onToken', token);
    Axios.post('/api/stripe',{
      method: 'POST',
      body: token,
      amount: 500
    }).then(res => console.log('success', res))
    .then(json => {
      console.log('json');
      console.log(json)
    })
  }
  
  render() {
    return (
      <div className="App">
        <Header />
      {/* <StripeCheckout token={this.onToken} stripeKey="pk_test_QbPg6qWGZHyNleXltFbwJRvp00uuYGPbfD" /> */}
        <div className="main-vid">Video Player</div>
        <div className="icons">Add icons</div>
        <Switch>
          
          <ul>
            <li>  
              <Route exact path="/" render={() => { return <div className= "video-container"> <Dashboard /> </div>; }}/></li>
            <li>
              <Route exact path="/pilot" render={() => { return ( <div>Pilot Information <PilotCard deleteVideo={this.deleteVideo} editVideo={this.editVideo} /></div>);}}/></li>
            <li>
            <Route exact path="/edit/:id" component={editVideo} />
            </li>
            </ul>
        </Switch>
      </div>
    );
  }
}

export default App;
