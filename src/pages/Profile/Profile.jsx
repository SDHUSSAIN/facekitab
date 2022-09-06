import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Axios from "axios"
import "../Profile/profile.css"
import Topbar from '../../components/Topbar/Topbar'
import Sidebar from '../../components/Sidebar/Sidebar'

import Center from '../../components/Center/Center'

import Rightbar from '../../components/Rightbar/Rightbar'


export default function Profile() {

  const [user, setUser] = useState({});

  const username = useParams().username ;

  useEffect(()=>{
    const fetchUser = async() =>{
     const response = await Axios.get(`/users?username=${username}`);
     setUser(response.data);
    }
    fetchUser();
  },[username])

  const PF = process.env.REACT_APP_PUBLIC_FOLDER ;

  return (
    <>
        <Topbar/>
        <div className="profile">
          <Sidebar/>
          <div className="profile__right">
              <div className="profile__right__top">
                  <div className="profile__cover">
                  <img src={user.coverPicture ? PF+user.coverPicture : PF+"post/noCoverImage.png"} className='profile__cover__img' alt="" />
                  <img src={user.profilePicture ? PF + useEffect.profilePicture :PF+"person/noAvatar.png"} className='profile__user__img' alt="" />
                  </div>
                  <div className="profile__info">
                      <h4 className='profile__info__name' >{user.username}</h4>
                      <h4 className='profile__info__desc' >{user.description}</h4>
                  </div>
                  
              </div>
              <div className="profile__right__bottom">
                <Center username={username}/>
                <Rightbar user={user}/>
              </div>
          </div>
          
        </div>
    </>
  )
}
