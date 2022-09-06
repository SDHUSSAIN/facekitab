import React from 'react'
import "../CloseFriend/close.css"

export default function CloseFriend({user}) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER ;
  return (
    <li className="sidebar__friend">
                    <img src={PF+user.profilePicture} alt="" className="sidebar__friend__img"/>
                    <span className='sidebar__friend__name'>{user.username}</span>
                </li>
  )
}
