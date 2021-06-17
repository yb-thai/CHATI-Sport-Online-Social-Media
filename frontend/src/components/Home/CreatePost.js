import React from 'react'
import './CreatePost.scss'
import { Avatar } from '@material-ui/core'
import PostIcon from '@material-ui/icons/Publish';
import PhotoIcon from '@material-ui/icons/AddAPhoto';
import FeelingIcon from '@material-ui/icons/EmojiEmotions';


{/* This one is for user to creat their own post */}

function CreatePost() {


    return (
        <div className='createPost'>
            <div className="createPost_top">
                <Avatar src='https://images.unsplash.com/photo-1536164261511-3a17e671d380?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=630&q=80' />
                    <form>
                        <input 
                            className='createPost_input'
                             placeholder={`Share your experience.`} />   


                        
                     </form>

            </div>
            <div className="createPost_bottom">
                <div className="createPost_option">
                    <PostIcon  />
                    <h3>Post</h3>
                </div>

                <div className="createPost_option">
                    <PhotoIcon />
                    <h3>Photo</h3>
                </div>

                <div className="createPost_option">
                    <FeelingIcon  />
                    <h3>Feeling</h3>

                </div>
            </div>
        </div>
    )
}

export default CreatePost
