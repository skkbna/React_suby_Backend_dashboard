import React from 'react'

const NavBar = ({showLoginHandler, showRegisterHandler, showLogOut, logOutHandler}) =>{
  console.log(showLoginHandler)
  return (
    <div className="navSection">
        <div className="company">
            Vendor Dashboard
        </div>
        <div className="userAuth">
          {!showLogOut ? <>
          <span onClick={showLoginHandler}>Login / </span>
          <span onClick={showRegisterHandler}>Register</span>
          </> : <span onClick={logOutHandler}>Logout</span> } 
        </div>
    </div>
  )
}

export default NavBar