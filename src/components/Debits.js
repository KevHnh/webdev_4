// src/components/Debits.js

import React, { useEffect, useState, Component } from 'react';
import { useHistory } from 'react-router-dom';
import "./Debits.css";
import Header from './Header';
import AccountBalance from './AccountBalance';


const Debits = (props) => {

    // global variables
    const navigate = useHistory();
    var arrTotal = 0;
    var initTotal = 0;
    GetTotal()

    // get the user addCredits from localStorage if there is any
    var arr = getItem('user')
    var arr1 = []

    if (arr !== null){
        for (let i = 0; i < arr.length; i++) {
            arrTotal += parseFloat(arr[i].amount)
          }
    }
    
    // var arr = []
    //console.log(props)

    var tcred = props.credit
    var tdeb = props.debit

    // function used to get the inital sum from the json file
    function GetTotal() {
      
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

        debitData.map((info) => {initTotal = debitData.reduce(function(prev, current) {
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
    function FetchDebits() {
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

        
        
        return(
            <div className='debitsContainer'>
                {debitData.map((info,pos) => {
                    initTotal = debitData.reduce(function(prev, current) {
                        return prev + +current.amount;
                    }, num);
                    return (
                      
                            <div className='debitCardContainer' key={pos}>
                                <div className='debitsCard'>
                                    
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

    // AddDebit class
    class AddDebits extends Component {
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

        // add userinput inside listItems when addDebits is clicked
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

        // route to a differnt page when header buttons are clicked. Also update debits in App.js
        debitUpdate(event, path){
            event.preventDefault();
            props.mockDebit(tdeb)
            navigate.push(path) 
        }

        


        render() {

            // add the user inputs in localStorage so we can print them out when the page is refreshed
            if (arr !== null){
                setItem('user',arr.concat(this.state.listItems))
            }
            else{
                setItem('user',this.state.listItems)
            }
            
            // get the local storage addDebits
            arr1 = getItem('user')

            //setItem('user',this.state.listItems)
            //console.log(arr1)

            //update the current debit sum
            let debitSum = this.state.listItems.reduce(function(prev, current){
                return prev + +current.amount
            }, initTotal);

            //update the total credit
            tdeb = debitSum + arrTotal
   
            return (
                <div className='debitsMain'>
                    {/* route buttons */}
                    <div className="debitHeader">
                        <div className="debitHeader_left">
                            <button onClick={(e) => {this.debitUpdate(e, '/')}} className="debit_homeButton">Home</button>
                        </div>
            
                        <div className="debitHeader_right">
                            <button onClick={(e) => {this.debitUpdate(e, "/userProfile")}} className="debit_linkButton">User Profile</button>
            
                            <button onClick={(e) => {this.debitUpdate(e, "/login")}} className="debit_linkButton">Login</button>
            
                            <button  onClick={(e) => {this.debitUpdate(e, "/credits")}} className="debit_linkButton">Credits</button>
            
                            <button  onClick={(e) => {this.debitUpdate(e, "/debits")}} className="debit_linkButton">Debits</button>
                        </div>
                    </div>

                    {/* user input boxes and display total balance and current debit */}
                    <div className='debitsLeft'>
                        <h1>Debits</h1>
                
                        <form onSubmit={this.onSubmit} className="formContainer">
                            <input  className="formBox" type="text" placeholder="Description" name="description" onChange={this.changeDescription} value={this.state.description} required />
                            <input className="formBox" type="number" placeholder="Amount" name="amount" onChange={this.changeAmount} value={this.state.amount} required />
                            <button className="submitBox" type="submit">Add Debit</button>
                        </form>
                        <div>
                            <div className='formBox'>Debit: ${(debitSum + arrTotal).toFixed(2)}</div>

                        </div>
                        <div>
                          <AccountBalance accountBalance={(parseFloat(tcred - tdeb)).toFixed(2)}/>
                        </div>
                    </div>

                    {/* display the user addDebits in list form */}
                    <div className='debitsRight'>
                            <FetchDebits/>
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
    <div className="debitsContainer">
    
        {/*<div className='nav'>
        <Header/>
        </div>*/}

        <div className="debitsBody">
            <AddDebits/>
        </div>

        
    </div>
  )
}

export default Debits;