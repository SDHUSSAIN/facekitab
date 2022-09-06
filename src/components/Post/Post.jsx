import React, {useState,useEffect, useContext} from 'react'
import {Link} from "react-router-dom"
import Axios from "axios";
import "../Post/post.css"
import { MoreVert } from "@material-ui/icons";
import {format} from "timeago.js";
import { AuthContext } from '../../context/AuthContext';

export default function Post({post}) {
    const {user:currentUser} = useContext(AuthContext);

    const [ like, setLike] = useState(post.likes.length);
    const [ isLiked, setIsLiked ] = useState(false);
    const [user, setUser] = useState({});

    const likeHandler = () =>{

        try{
            Axios.put("/posts/"+post._id+"/like",{userId:currentUser._id})
        }catch(error){}
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }

    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id,post.likes])

    useEffect(()=>{
        const fetchUser = async() =>{
         const response = await Axios.get(`/users?userId=${post.userId}`);
         setUser(response.data);
        }
        fetchUser();
      },[post.userId])

    const PF = process.env.REACT_APP_PUBLIC_FOLDER ;

  return (
    <div className='post'>
        <div className="post__wrapper">
            <div className="post__top">
                <div className="post__left">
                    <Link to={`/profile/${user.username}`}>
                        <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} className='post__profile__img' alt="" />
                    </Link>
                    
                    <span className="post__username">{user.username}</span>
                    <span className="post__date">{format(post.createdAt)}</span>
                </div>
                <div className="post__right">
                    <MoreVert/>
                </div>
            </div>
            <div className="post__center">
                <span className="post__text">{post?.description}</span>
                <img className='post__image' src={PF+post.img} alt="" />
            </div>
            <div className="post__bottom">
                <div className="post__bottom__left">
                    <img className='like__icon' src={`${PF}like.png`} alt="" onClick={likeHandler} />
                    <img className='like__icon' src={`${PF}heart.png`} alt="" onClick={likeHandler} />
                    <span className="post__like__counter">{like} people liked it</span>
                </div>
                <div className="post__right__left">
                    <div className="post__comment__text">{post.comment} comments</div>
                </div>
            </div>
        </div>
    </div>
  )
}
