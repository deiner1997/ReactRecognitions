import React, { Component, Fragment } from 'react';
import isEmpty from "is-empty";
import {Header, Main, Footer} from './Layout';

class App extends Component {
  state = {
    loadingUser: false
  }
  componentDidMount() {
    const token = window.localStorage.getItem('jwt');
    if (!isEmpty(token)) {
      this.setState({ loadingUser: true })
    } else {
      this.setState({ loadingUser: false })
    }
  }
  render() {
    const loadingUser = this.state
    return( 
      <Fragment>
        <Header loadingUser={loadingUser.loadingUser}/>
        <Main/>
        <Footer/>
      </Fragment>
    )
  }
}

export default App;
