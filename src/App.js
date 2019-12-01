import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props)
    console.log('calling: constructor');
    this.state = {
      
    };

  }

  render() {
    let isOpen = true;
    return (
      <Router>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <span><h1 className="display-5">My App</h1></span>
              <Route exact path="/" component={LoginForm} />
              <Route path="/SingUp" component={() => <SignUpForm isOpen={isOpen} />} />
              </div>
          </div>
          </div>
      </Router>
        );
  }
}

export default App;
