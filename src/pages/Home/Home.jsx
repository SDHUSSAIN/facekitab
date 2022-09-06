import React,{useContext} from 'react'
import "../Home/home.css"
import Topbar from '../../components/Topbar/Topbar'
import Sidebar from '../../components/Sidebar/Sidebar'

import Center from '../../components/Center/Center'

import Rightbar from '../../components/Rightbar/Rightbar'
import { AuthContext } from '../../context/AuthContext'


export default function Home() {
  const {user:currentUser} = useContext(AuthContext);
  return (
    <>
        <Topbar/>
        <div className="home__container">
          <Sidebar/>
          <Center/>
          <Rightbar user={currentUser}/>
        </div>
    </>
  )
}
