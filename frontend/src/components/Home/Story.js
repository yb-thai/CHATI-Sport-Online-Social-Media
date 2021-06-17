import { Avatar } from '@material-ui/core'
import React from 'react'
import './Story.scss'

{/* Individual Story that will add to the story block to render*/}

function Story({image, profileImgSrc, title}) {
    return (
        // add the story content as the background of the component
        <div style= {{backgroundImage: `url(${image})`}} className='story'>
            <Avatar className='story_avatar' src={profileImgSrc}  />
            <h4>{title}</h4>
        </div>
    )
}

export default Story
