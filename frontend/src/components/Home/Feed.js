import React from 'react'
import './Feed.scss'
import CreatePost from './CreatePost'
import Post from './Post'



{/* New feed section, Display posted content with a few details */}
function Feed() {
    return (
        <div className='feed'>
          
            <CreatePost />
        {/* A few manually added posts */}
            <Post
                profilePicSrc = 'https://images.unsplash.com/photo-1617339847756-976edbc411e7?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'
                messageContent='Caption'
                timeStamp='We can add time stamp here'
                userName= 'Friend 1'
                image='https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1300&q=80'
            />
            <Post
                profilePicSrc = 'https://images.unsplash.com/photo-1612392062798-4117917fcc50?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                messageContent = 'Caption'
                timeStamp = 'Time stamp'
                userName = 'Friend 2'
                image = 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'

            />
                
            <Post
                profilePicSrc = 'https://images.unsplash.com/photo-1617582907226-c49e2d8200d9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                messageContent = 'Caption'
                timeStamp = 'Timestamp'
                userName = 'Friend 3'
                image = 'https://images.unsplash.com/photo-1508997449629-303059a039c0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            />

            
        </div>
    )
}

export default Feed
