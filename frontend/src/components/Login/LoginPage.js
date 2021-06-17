import React from 'react';
import Login from './login';
import Register from './register';
import './LoginPage.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';



{/* The actual page render */}
class LoginPage extends React.Component {

  render() {
    
    return (
      <div className='loginPage'>
      
       <Router>
          <Switch>
         <Route exact path = "/"><Login/></Route>
         <Route path = "/register"><Register/></Route>
          
          </Switch>
      </Router>

      </div>
    );
  }
}




export default LoginPage;