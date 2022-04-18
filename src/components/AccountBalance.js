// src/components/AccountBalance.js

import React, {Component} from 'react';

class AccountBalance extends Component {
  render() {
    return (
      <div>

        <div>
        Total Balance: ${this.props.accountBalance}
        </div>
      </div>
    );
  }
}

export default AccountBalance;
