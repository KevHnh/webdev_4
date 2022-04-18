
import React from 'react'
import { useHistory } from 'react-router-dom';
import './Header.css'

export default function Header() {
    
    const navigate = useHistory();

    const redirectButton = (path) => {
        navigate.push(path)
    } 

  return (
    <div>
        <div className="Header">

            <div className="Header_left">
            
                <button onClick={() => redirectButton("/webdev_4/")} className="homeButton">Home</button>
            </div>

            <div className="Header_right">
                <button onClick={() => redirectButton("/webdev_4/userProfile")} className="linkButton">User Profile</button>

                <button onClick={() => redirectButton("/webdev_4/login")}  className="linkButton">Login</button>

                <button onClick={() => redirectButton("/webdev_4/credits")} className="linkButton">Credits</button>

                <button onClick={() => redirectButton("/webdev_4/debits")}  className="linkButton">Debits</button>


            </div>
        
        </div>
    </div>
  )
}
