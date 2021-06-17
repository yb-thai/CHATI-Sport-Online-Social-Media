import React from 'react'
import './Post.scss'
import { Avatar } from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUpAlt';
import CommentIcon from '@material-ui/icons/ChatBubbleOutline';
import ShareIcon from '@material-ui/icons/Share';



{/* Use to Create post and add to the feed section*/}
function Post({profilePicSrc, image, userName, timeStamp, messageContent}) {
    return (
        <div className='post'>
            <div className='post_top'>
                <Avatar src={profilePicSrc} className='post_avatar' />
                <div className='post_topInfo'>
                    <h3>{userName}</h3>
                    <p>{timeStamp}</p>

                </div>
            </div>
            <div className='post_bottom'>
                <p>{messageContent}</p>
            </div>

            <div className="post_img">
                <img src={image} alt='' />
            </div>

            <div className="post_options">
                <div className="post_option">
                    <ThumbUpIcon />
                    <p>Like</p>
                </div>


                <div className="post_option">
                    <CommentIcon />
                    <p>Comment</p>
                </div>

                <div className="post_option">
                    <ShareIcon />
                    <p>Share</p>
                </div>


            </div>
        </div>
    )
}

export default Post
