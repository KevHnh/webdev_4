// src/components/Credits.js

import React, { useEffect, useState, Component } from 'react';
import { useHistory } from 'react-router-dom';
import "./Credits.css";
import Header from './Header';
import AccountBalance from './AccountBalance';


const Credits = (props) => {

    // global variables
    const navigate = useHistory();
    var arrTotal = 0;
    var initTotal = 0;
    GetTotal()
    
    // get the user addCredits from localStorage if there is any
    var arr = getItem('user1')
    var arr1 = []

    if (arr !== null){
        for (let i = 0; i < arr.length; i++) {
            arrTotal += parseFloat(arr[i].amount)
          }
    }

    //console.log(props)
    var tcred = props.credit
    var tdeb = props.debit
    
    // function used to get the inital sum from the json file
    function GetTotal() {
      
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

        creditData.map((info) => {initTotal = creditData.reduce(function(prev, current) {
                    return prev + +current.amount;
                    }, num);

                    if (initTotal > max) {
                        max = initTotal;
                    }

                    return (
                        <h1></h1>
                        
                    )
                })
        
        return max;
    }

    // function used to fetch the json file and display it 
    function FetchCredits() {
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

        return(
            <div className='creditsContainer'>
                {creditData.map((info,pos) => {
                    initTotal = creditData.reduce(function(prev, current) {
                        return prev + +current.amount;
                    }, num);
                    return (
                      
                            <div className='creditCardContainer' key={pos}>
                                <div className='creditsCard'>
                                    
                                    <div className='infoDiv'>{info.description}</div>
                                    <div className='infoDiv'>${info.amount}</div>
                                    <div className='infoDiv'>{info.date.slice(0,10)}</div>
                                </div>
                                
                            </div>
                        
                    )
                })}
            </div>
        )
    }
   

    // function used to add user addCredits to localStorage
    function setItem(key, item) {
        localStorage.setItem(key, JSON.stringify(item));
    }

    // function used to retrieve user addCredits from localStorage
    function getItem(key) {
        const item = localStorage.getItem(key);
        return JSON.parse(item);
    }

    // function that get the current date
    function getDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
        
        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }

    // AddCredits class
    class AddCredits extends Component {
        constructor() {
            super();
            this.state = {
                listItems: [],
                description: '',
                amount: Number,
                date: getDate(),
            }
            this.sum = {
                max: initTotal,
            }

            this.changeDescription = this.changeDescription.bind(this);
            this.changeAmount = this.changeAmount.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
        }

        // description setter
        changeDescription(event) {
            this.setState({
                description:event.target.value
            })
        }
        
        // amount setter
        changeAmount(event) {
            this.setState({
                amount:event.target.value
            })
        }

        // add userinput inside listItems when addCredits is clicked
        onSubmit(event) {
            event.preventDefault();

            this.setState({
                listItems: [...this.state.listItems, {description: this.state.description, amount: this.state.amount, date: this.state.date}]
            })

            this.setState({
                description:'',
                amount:Number,
            })

        }

        // route to a differnt page when header buttons are clicked. Also update credits in App.js
        creditUpdate(event,path){
            event.preventDefault();
            props.mockCredit(tcred)
            navigate.push(path)
        }

        render() {
            // add the user inputs in localStorage so we can print them out when the page is refreshed
            if (arr !== null){
                setItem('user1',arr.concat(this.state.listItems))
            }
            else{
                setItem('user1',this.state.listItems)
            }

            // get the local storage addCredits
            arr1 = getItem('user1')
            
            //setItem('user1',this.state.listItems)
            //console.log(arr1)

            //update the current credit sum
            let creditSum = this.state.listItems.reduce(function(prev, current){
                return prev + +current.amount
            }, initTotal);

            //update the total credit
            tcred = creditSum + arrTotal
            
   
            return (
                <div className='creditsMain'>
                    {/* route buttons */}
                     <div className="creditHeader">
                        <div className="creditHeader_left">
                            <button onClick={(e) => {this.creditUpdate(e, '/')}} className="credit_homeButton">Home</button>
                        </div>
            
                        <div className="creditHeader_right">
                            <button onClick={(e) => {this.creditUpdate(e, "/userProfile")}} className="credit_linkButton">User Profile</button>
            
                            <button onClick={(e) => {this.creditUpdate(e, "/login")}} className="credit_linkButton">Login</button>
            
                            <button  onClick={(e) => {this.creditUpdate(e, "/credits")}} className="credit_linkButton">Credits</button>
            
                            <button  onClick={(e) => {this.creditUpdate(e, "/debits")}} className="credit_linkButton">Debits</button>
                        </div>
                    </div>

                    {/* user input boxes and display total balance and current credit */}
                    <div className='creditsLeft'>
                        <h1>Credits</h1>
                
                        <form onSubmit={this.onSubmit} className="formContainer">
                            <input  className="formBox" type="text" placeholder="Description" name="description" onChange={this.changeDescription} value={this.state.description} required />
                            <input className="formBox" type="number" placeholder="Amount" name="amount" onChange={this.changeAmount} value={this.state.amount} required />
                            <button className="submitBox" type="submit">Add Credits</button>
                        </form>
                        <div>
                            <div className='formBox'>Credit: ${(creditSum + arrTotal).toFixed(2)}</div>
                            <AccountBalance accountBalance={parseFloat(tcred - tdeb).toFixed(2)}/>
                        </div>
                        
                    </div>

                    {/* display the user addCredits in list form */}
                    <div className='creditsRight'>
                            <FetchCredits/>
                            <div>
                                {
                                    arr1.map((li,key) => 
                                    <div className="newEntryCardContainer">
                                        <div {...{key}} className="newEntryCard">
                                            <div className="infoDiv" >{li.description}</div>
                                            <div className="infoDiv" >${li.amount}</div>
                                            <div className="infoDiv" >{li.date}</div>
                                        </div>
                                    </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
            )
                            
        }
    }

  return (
    <div className="creditsContainer">
    
        {/*<div className="nav">
            <Header/>
            
        </div>*/}

        <div className="creditsBody">
            <AddCredits/>
        </div>

        
    </div>
  )
}

export default Credits;