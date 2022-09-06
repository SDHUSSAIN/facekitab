import React, {useRef} from 'react'
import "../../pages/Register/register.css"
import {Link,useNavigate} from "react-router-dom"
import Axios from 'axios';

export default function Register() {
  const username = useRef();
  const password = useRef();
  const email = useRef();
  const confirmpassword = useRef();

  const navigate = useNavigate();

  const handleClick = async(e) =>{
    e.preventDefault();
    if(password.current.value !== confirmpassword.current.value){
        password.current.setCustomValidity("Passwords do not match!")
    }else{
      const user = {
        username:username.current.value,
        password:password.current.value,
        email:email.current.value
      };
      try{
        Axios.post("/auth/register",user);  
        navigate("/login");
      }catch(error){
        console.log(error);
      } 
    }
  }



  return (
    <div className='login'>
        <div className="login__wrapper">
            <div className="login__left">
                <h4 className="login__logo">faceKitab</h4>
                <span className="login__description">Connect with friends and family around the world on faceKitab</span>
            </div>
            <div className="login__right">
                <form className="login__box" onSubmit={handleClick} >
                  <input placeholder='Username' ref={username} required className='login__input' />
                  <input placeholder='Email' ref={email} type="email" required className='login__input' />
                  <input placeholder='Password' ref={password} type="password" minLength="6" required className='login__input' />
                  <input placeholder='Confirm Password'ref={confirmpassword} required className='login__input' />
                  <button className='login__button' type='submit' >Signup</button>
                  <Link to="/login" className='login__register__button' >
                    <button className='login__register__button'>Log into your Account</button>
                  </Link>
                </form>
            </div>
        </div>
    </div>
  )
}
