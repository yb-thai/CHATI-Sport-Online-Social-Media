import React from 'react'
import './Header.scss'
import Img from './headerLogo.png';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ForumIcon from '@material-ui/icons/Forum';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userActions'


{/*This is the header section of the homepage */ }

function Header() {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
 
    const dispatch = useDispatch()

    const sendLogout = () => {
        console.log("sendLogout")
        dispatch(logout())
        setTimeout(() => {
            window.location.reload();
          }, 500);
      }

    return (
        <div className='header'>

            <div className='header_left'>
                <img src={Img} alt='' />

                <div className='header_input'>
                    <SearchIcon />
                    <input placeholder='Search CHATI' type='text'></input>
                </div>


            </div>

            <div className='header_middle'>
               
            </div>


            <div className='header_right'>
                <div className='header_info'>
                    <Avatar src={'https://images.unsplash.com/photo-1536164261511-3a17e671d380?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=630&q=80'} className='avatar' />
                    <h4>User</h4>
                </div>

                <IconButton>
                    <AddIcon />
                </IconButton>
                <IconButton>
                    <ForumIcon />
                </IconButton>

                <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <ExpandMoreIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={sendLogout} to="/Login">Logout</MenuItem>
                </Menu>

             

            </div>
        </div>
    )
}

export default Header






