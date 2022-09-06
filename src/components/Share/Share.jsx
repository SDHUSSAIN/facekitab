import React, { useContext, useRef,useState } from 'react'
import "../Share/share.css"
import {PermMedia, Label, Room, EmojiEmotions} from "@material-ui/icons"
import { AuthContext } from '../../context/AuthContext'
import Axios from 'axios';

export default function Share() {

    const {user} = useContext(AuthContext);
    const description = useRef();
    const [file,setFile] = useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const submitHandler = async (e) =>{
        e.preventDefault();
        const newPost = {
            userId : user._id,
            description:description.current.value
        }

        if(file){
            const formdata = new FormData();
            const fileName = file.name;
            formdata.append("file",file);
            formdata.append("filename",fileName);
            newPost.img = fileName;
            
            try{
                
                await Axios.post("/upload",formdata);
                description.current.value = "";
                setFile(null);
                
            }catch(error){
                console.log(error);
            }
        }

        try{
            await Axios.post("/posts",newPost);
            window.location.reload();
        }catch(error){
            console.log(error);
        }
    }



  return (
    <div className='share'>
        <div className="share__wrapper">
            <div className="share__top">
                <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} className='share__profile__img' alt="" />
                <input placeholder={'What is in your mind '+ user.username+"?"} className='share__input' ref={description}  />
            </div>
            <hr className='share__hr'/>
            <form className="share__bottom" onSubmit={submitHandler}>
                <div className="share__options">
                    <label htmlFor='file' className="share_option">
                        <PermMedia htmlColor='tomato' className='share__icon'/>
                        <span className="share__option__text">Photo or Video</span>
                        <input type="file" style={{display:"none"}} id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])} />
                    </label>
                    <div className="share_option">
                        <Label htmlColor='blue' className='share__icon'/>
                        <span className="share__option__text">Tag</span>
                    </div>
                    <div className="share_option">
                        <Room htmlColor='green' className='share__icon'/>
                        <span className="share__option__text">Location</span>
                    </div>
                    <div className="share_option">
                        <EmojiEmotions htmlColor='goldenrod' className='share__icon'/>
                        <span className="share__option__text">Feelings</span>
                    </div>
                </div>
                <button className='share__button' type = "submit" >Share</button>
            </form>
            
        </div>

    </div>
  )
}
