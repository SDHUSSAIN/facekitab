import React,{useContext, useRef} from 'react'
import {Link} from "react-router-dom"
import "../../pages/Login/login.css"
import { loginCall } from '../../apiCalls';
import {AuthContext} from "../../context/AuthContext"
import {CircularProgress} from "@material-ui/core"

export default function Login() {

  const email = useRef();
  const password = useRef();

  const {user,isFetching,error,dispatch} = useContext(AuthContext);
  const handleClick = (e) =>{
    e.preventDefault();
    loginCall({email:email.current.value,password:password.current.value},dispatch);
  }

  console.log(user);

  return (
    <div className='login'>
        <div className="login__wrapper">
            <div className="login__left">
                <h4 className="login__logo">faceKitab</h4>
                <span className="login__description">Connect with friends and family around the world on faceKitab</span>
            </div>
            <div className="login__right">
                <form className="login__box" onSubmit={handleClick}  >
                  <input placeholder='Email' className='login__input' type="email" required ref={email}/>
                  <input placeholder='Password' className='login__input' type="password" required minLength="6" ref={password} />
                  <button className='login__button' type="submit" disabled={isFetching}>{isFetching ? <CircularProgress color='white' size="25px"/> : "Log In"}</button>
                  <span className='login__forgot'>Forgot Password?</span>
                  <Link to="/register" className='login__register__button'>
                    <button className='login__register__button'>{isFetching ? <CircularProgress color='white' size="25px"/> : "Create New Account"}</button>
                  </Link>
                </form>
            </div>
        </div>
    </div>
  )
}
