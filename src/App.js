import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Container } from 'semantic-ui-react'

import About from "./pages/About";
import Todos from "./containers/Todos";
import FixedMenuLayout from "./components/layouts/FixedMenu";

import { todos } from "./reducers/todos";

const store = createStore(todos, applyMiddleware(thunkMiddleware));

class App extends Component {

  render() {

    return (
      <Router>
        <div className="App">
          <div className="container">
            <FixedMenuLayout />
            <br />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <Container style={{ marginTop: '7em' }}>
                  <Todos store={store} />
                </Container>
              </React.Fragment>
            )} />

            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
      
    );
  }
}

export default App;
