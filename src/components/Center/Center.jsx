import React,{useState,useEffect, useContext} from 'react'
import Axios from "axios";
import "../Center/center.css"
import Post from '../Post/Post'
import Share from "../Share/Share"
import {Posts} from "../../dummydata"
import { AuthContext } from '../../context/AuthContext';

export default function Center({username}) {
 

  const [posts,setPosts] = useState([]);
  const {user} = useContext(AuthContext);

   useEffect(()=>{
     const fetchPost = async() =>{
      const response = username ? await Axios.get("/posts/profile/"+ username) 
                                :await Axios.get("/posts/timeline/"+user._id);
      setPosts(response.data.sort((p1,p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
     }
     fetchPost();
     

   },[username,user._id])
  return (
    <div className='center'>
      <div className="center__wrapper">
        <Share/>
        
        {
          posts.map((post)=>{
            return (<Post key={post._id} post={post} />)
          })
        }
      </div>
    </div>
  )
}
