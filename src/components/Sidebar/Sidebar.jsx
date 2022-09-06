import React from 'react'
import "../Sidebar/sidebar.css"
import {User} from "../../dummydata"
import {RssFeed, ChatBubbleOutline, PlayCircleFilledOutlined, HelpOutline, Event, School, WorkOutline, Group, Bookmark, } from "@material-ui/icons"
import CloseFriend from '../CloseFriend/CloseFriend'

export default function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebar__wrapper">
            <ul className='sidebar__list'>
                <li className='sidebar__list__item'>
                    <RssFeed className="sidebar__icon"/>
                    <span className="sidebar__list__item__text">Feed</span>
                </li>
                <li className='sidebar__list__item'>
                    <ChatBubbleOutline className="sidebar__icon"/>
                    <span className="sidebar__list__item__text">Chats</span>
                </li>
                <li className='sidebar__list__item'>
                <PlayCircleFilledOutlined className="sidebar__icon"/>
                    <span className="sidebar__list__item__text">Videos</span>
                </li>
                <li className='sidebar__list__item'>
                    <Group className="sidebar__icon"/>
                    <span className="sidebar__list__item__text">Groups</span>
                </li>
                <li className='sidebar__list__item'>
                    <Bookmark className="sidebar__icon"/>
                    <span className="sidebar__list__item__text">Bookmarks</span>
                </li>
                <li className='sidebar__list__item'>
                    <HelpOutline className="sidebar__icon"/>
                    <span className="sidebar__list__item__text">Questions</span>
                </li>
                <li className='sidebar__list__item'>
                    <WorkOutline className="sidebar__icon"/>
                    <span className="sidebar__list__item__text">Jobs</span>
                </li>
                <li className='sidebar__list__item'>
                    <Event className="sidebar__icon"/>
                    <span className="sidebar__list__item__text">Events</span>
                </li>
                <li className='sidebar__list__item'>
                    <School className="sidebar__icon"/>
                    <span className="sidebar__list__item__text">Courses</span>
                </li>
            </ul>
            <button className='sidebar__button'>Show more</button>
            <hr className='sidebar__hr'/>
            <ul className="sidebar__freind__list">
               {
                   User.map((user)=>{
                       return (<CloseFriend key={user.id} user={user} />)
                   })
                   
               }
                
            </ul>
        </div>
    </div>
  )
}
