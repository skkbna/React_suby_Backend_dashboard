import React,{useState, useEffect} from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'



const LandingPage = () => {
   const [showLogin, setShowLogin] = useState(false)
   const [showRegister, setShowRegister] = useState(false)
   const [showFirm, setShowFirm] = useState(false)
   const [showProduct, setShowProduct] = useState(false)
   const [showWelcome, setShowWelcome] = useState(false)
   const [showAllProducts, setShowAllProducts] = useState(false)
   const [showLogOut, setShowLogOut] = useState(false)


   useEffect(()=>{
    const loginToken = localStorage.getItem('loginToken');
    if(loginToken){
        setShowLogOut(true)
    }
   }, [])

   const logOutHandler = ()=>{
    confirm("Are you sure to logout?")
     localStorage.removeItem("loginToken");
     localStorage.removeItem('firmId')
     setShowLogOut(false)

   }



const showLoginHandler =()=>{
   setShowLogin(true)
   setShowRegister(false)
   setShowFirm(false)
   setShowProduct(false)
   setShowWelcome(false)
   setShowAllProducts(false)
}

const showRegisterHandler = () =>{
   setShowRegister(true)
   setShowLogin(false)
   setShowFirm(false)
   setShowProduct(false)
   setShowWelcome(false)
   setShowAllProducts(false)

} 

const showFirmHandler= () =>{
  setShowRegister(false)
  setShowLogin(false)
  setShowFirm(true)
  setShowProduct(false)
  setShowWelcome(false)
  setShowAllProducts(false)

}
const showProductHandler= () =>{
  setShowRegister(false)
  setShowLogin(false)
  setShowFirm(false)
  setShowProduct(true)
  setShowWelcome(false)
  setShowAllProducts(false)
 
}
const showWelcomeHandler= () =>{
  setShowRegister(false)
  setShowLogin(false)
  setShowFirm(false)
  setShowProduct(false)
  setShowWelcome(true)
  setShowAllProducts(false)
 
 
}

const showAllProductsHandler = () =>{
  setShowRegister(false)
  setShowLogin(false)
  setShowFirm(false)
  setShowProduct(false)
  setShowWelcome(false)
  setShowAllProducts(true)
 
}



  return (
    <>
       <section className="landingSection">
          <NavBar showLoginHandler = {showLoginHandler} showRegisterHandler = {showRegisterHandler}
          showLogOut ={showLogOut}
          logOutHandler ={logOutHandler}
          />
          <div className="collectionSection">
            <SideBar showFirmHandler={showFirmHandler} showProductHandler = {showProductHandler}
              showAllProductsHandler={showAllProductsHandler}
            />
          {showLogin && <Login showWelcomeHandler= {showWelcomeHandler} /> }
            {showRegister && <Register showLoginHandler = {showLoginHandler}/>}
            {showFirm && <AddFirm />}
            {showProduct && <AddProduct/>}
            {showWelcome && <Welcome />}
            {showAllProducts && <AllProducts />}
          </div> 
       </section>
    </>
  )
}

export default LandingPage