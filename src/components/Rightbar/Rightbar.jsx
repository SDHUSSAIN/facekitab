import React, { useEffect, useState } from 'react'
import "../Rightbar/rightbar.css"
import {User} from "../../dummydata"
import Online from '../Online/Online'
import Axios from "axios";

export default function Rightbar({user}) {
  
  const PF = process.env.REACT_APP_PUBLIC_FOLDER ;

  const [friendsList,setFriendsList] = useState([]);

  useEffect(()=>{
   
    const getFriends = async() =>{
      try{
        const friends =  await Axios.get("/users/friends/" + user._id);
        setFriendsList(friends.data);
        console.log(friends.data);
      }catch(error){
        console.log(error);
      }
    }

    getFriends();
  },[user._id]);

  const HomeRightBar = () =>{
    return (
      <>
        <div className="birthday__container">
          <img src="/assets/gift.png" className='birthday__img' alt="" />
          <span className="birthday__text">
            <b>Ankit</b> and <b>3 other friends</b> have birthday today
          </span>
        </div>
        <img  className='rightbar__ad' src="/assets/ad.png" alt="" />
        <h4 className="rightbar__title">Online Friends</h4>
        <ul className='rightbar__friends__list'>
          {
            User.map((user)=>{
              return (<Online key = {user.id} user={user}/>)
            })
            
          }
        </ul>
      </>
    )
  }


  const ProfileRightBar = ()=>{
    return (
      <>
        <h4 className='rightbar__title'>User Info</h4>
        <div className="rightbar__info">
          <div className="rightbar__info__item">
            <span className="rightbar__info__key">City:</span>
            <span className="rightbar__info__key">{user.city === undefined ? "N.A." : user.city }</span>
          </div>
          <div className="rightbar__info__item">
            <span className="rightbar__info__key">From:</span>
            <span className="rightbar__info__key">{user.from === undefined ? "N.A." : user.from}</span>
          </div>

          <div className="rightbar__info__item">
            <span className="rightbar__info__key">Relationship:</span>
            <span className="rightbar__info__key">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "N.A"}</span>
          </div>

        </div>
        <h4 className="rightbar__title">User Friends</h4>
        <div className="rightbar__followings">
          {
            friendsList.map((friend)=>{
              console.log(friend);
              return (
                <div className="rightbar__following">
                  <img src={friend.profilePicture ? PF+friend.profilePicture : PF+"person/noAvatar.png"}  className='rightbar__following__img' alt="" />
                  <span className="rightbar__following__name">{friend.username}</span>
                </div>
              )
            })
          }
          
        </div>
      </>
    )
  }
  return (
    <div  className='rightbar'>
      <div className="rightbar__wrapper">
        {
          user ? <ProfileRightBar/> : <HomeRightBar/>
        }
        
      </div>
    </div>
  )
}
