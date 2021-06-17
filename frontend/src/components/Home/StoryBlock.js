import React from 'react'
import './StoryBlock.scss'
import Story from './Story'


{/* Story Block will consists of stories taken from story file*/}

function StoryBlock() {
    return (
        <div className='storyBlock'>
                <Story 
                    image = 'https://images.unsplash.com/photo-1550697797-f01b4e83a1be?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80'
                    profileImgSrc = 'https://www.economist.com/sites/default/files/images/2014/12/blogs/economist-explains/20141213_blp504.jpg'
                    title = 'Friend 1'
                />
                <Story 
                  image = 'https://images.unsplash.com/photo-1572085313466-6710de8d7ba3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80'
                  profileImgSrc = 'https://images.unsplash.com/photo-1520283818086-3f6dffb019c0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                  title = 'Friend 2'
                />
                <Story 
                
                  image = 'https://images.unsplash.com/photo-1514425263458-109317cc1321?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80'
                  profileImgSrc = 'https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=700&q=80'
                  title ='Friend 3'
                />
                <Story
                  image = 'https://images.unsplash.com/photo-1519743375942-b497d66b1e8f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80'
                  profileImgSrc = 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80'
                  title ='Friend 4'

                />
            

        </div>
    )
}

export default StoryBlock
