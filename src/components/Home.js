// src/components/Home.js
// The Home component is used to demonstrate the use of Link.

import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';


class Home extends Component {
  render() {
    return (
      <div>
        <img src="https://picsum.photos/200/200" alt="bank"/>
        <h1>Bank of React</h1>

        <Link to="/webdev_4/userProfile">User Profile</Link>
        <br/>
        <Link to="/webdev_4/login">Login</Link>
        <br/>
        <Link to="/webdev_4/credits">Credits</Link>
        <br/>
        <Link to="/webdev_4/debits">Debits</Link>
        
        <AccountBalance accountBalance={this.props.accountBalance}/>
      </div>
    );
  }
}

export default Home;