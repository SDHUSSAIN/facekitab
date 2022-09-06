import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import "../Topbar/topbar.css"
import {Search, Person, Chat, Notifications } from "@material-ui/icons"
import { AuthContext } from '../../context/AuthContext';

export default function Topbar() {

  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER ;

  return (
    <div className='topbar__container'>
      <div className='topbar__left'>
        <Link to="/" style={{textDecoration:"none"}} >
          <span className="logo">faceKitab</span>
        </Link>
          
      </div>
      <div className='topbar__center'>
        <div className="search__bar">
          <Search className='search__icon'/>
          <input placeholder="Search for friend, post or video" className='search__input'/>
        </div>
      </div>
      <div className='topbar__right'>
        <div className="topbar__links">
          <span className="topbar__link">Homepage</span>
          <span className="topbar__link">Timeline</span>
        </div>
        <div className="topbar__icons">
          <div className="topbar__icon__item">
            <Person/>
            <span className="topbar__icon__badge">1</span>

          </div>
          <div className="topbar__icon__item">
            <Chat/>
            <span className="topbar__icon__badge">1</span>

          </div>
          <div className="topbar__icon__item">
            <Notifications/>
            <span className="topbar__icon__badge">1</span>

          </div>
        </div>
        <Link to={`/profile/${user.username}`} >
          <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png" } alt="" className='topbar__img' />
        </Link>
        
      </div>
    </div>
  );
}
