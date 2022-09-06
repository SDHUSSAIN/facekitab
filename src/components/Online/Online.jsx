import React from 'react'
import "../Online/online.css"

export default function Online({user}) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER ;
  return (
    <li className="rightbar__friend">
            <div className="rightbar__img__container">
              <img className='rightbar__profile__img' src={PF+user?.profilePicture} alt="" />
              <span className='rightbar__online'></span>
            </div>
            <span className='rightbar__username'>{user.username}</span>
          </li>
  )
}
