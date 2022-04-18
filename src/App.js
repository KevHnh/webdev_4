// src/App.js

import React, {Component, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';


const InitialApp = () => {

  // get the inital debit and credit values from the json file
  var initalDebit= 0
  var initalCredit = 0
  GetInitialDebit()
  GetInitialCredit()

  // when the user first starts the program remove everything in local storage
  localStorage.removeItem("user1");
  localStorage.removeItem("user");

  // get the inital debit sum
  function GetInitialDebit() {

    const [debitData, setDebitData] = useState([{
        description: '',
        amount: '',
        date: '',
    }])

    useEffect(() => {fetch('https://moj-api.herokuapp.com/debits')
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then(jsonRes => setDebitData(jsonRes));
    }, [])
    
    var num = 0;
    var max = 0;

    debitData.map((info) => {initalDebit = debitData.reduce(function(prev, current) {
                return prev + +current.amount;
                }, num);

                if (initalDebit > max) {
                    max = initalDebit;
                }

                return (
                    <h1></h1>
                    
                )
            })
    
    return max;
  }

  // get the inital credit sum
  function GetInitialCredit() {
        
    const [creditData, setCreditData] = useState([{
        description: '',
        amount: '',
        date: '',
    }])

    useEffect(() => {fetch('https://moj-api.herokuapp.com/credits')
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then(jsonRes => setCreditData(jsonRes));
    }, [])
    

    var num = 0;
    var max = 0;

    creditData.map((info) => {initalCredit = creditData.reduce(function(prev, current) {
                return prev + +current.amount;
                }, num);

                if (initalCredit > max) {
                    max = initalCredit;
                }

                return (
                    <h1></h1>
                    
                )
            })
    
    return max;
  }

  //console.log(initalDebit)
  //console.log(initalCredit)



  class App extends Component {
    constructor() {  // Create and initialize state
      super(); 
      this.state = {
        accountBalance: 14568.27,
        credit: initalCredit,
        debit: initalDebit,
        currentUser: {
          userName: 'Joe Smith',
          memberSince: '07/23/96',
        }
      }
    }


    mockDebit = (logInInfo) => {
      //console.log(logInInfo)
      this.setState({debit: logInInfo})
    }

    mockCredit = (creditInfo) => {
      //console.log(logInInfo)
    
      this.setState({credit: creditInfo})
    }


    // Update state's currentUser (userName) after "Log In" button is clicked
    mockLogIn = (logInInfo) => {  
      const newUser = {...this.state.currentUser}
      newUser.userName = logInInfo.userName
      this.setState({currentUser: newUser})
    }

    // Create Routes and React elements to be rendered using React components
    render() {  
      
      const DebitComponent = () => (<Debits credit={this.state.credit} debit={this.state.debit} mockDebit={this.mockDebit}/>);
      const CreditComponent = () => (<Credits credit={this.state.credit} debit={this.state.debit} mockCredit={this.mockCredit}/>);
      const HomeComponent = () => (<Home accountBalance={(this.state.credit - this.state.debit).toFixed(2)}/>);
      const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
      );
      const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)  // Pass props to "LogIn" component
        
      return (
        <Router>
          <div>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
            <Route exact path="/credits" render={CreditComponent}/>
            <Route exact path="/debits" render={DebitComponent}/>
          </div>
        </Router>
      );
    }
  }

  return(
    <div>
      <App/>  
    </div>
  )

}

export default InitialApp;