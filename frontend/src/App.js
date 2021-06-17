import React from 'react';
import PropTypes from 'prop-types';
import Header from './components/Layout/Header'
import Sidenav from './Sidenav';
import LeftsideWidget from './components/Layout/LeftsideWidget';


// Header, Side navigation and leftside widget stay the same we only change the middle which is children prop
const App = ({ children }) => {



  return (
    <div>

      <Header/>
     
       <Sidenav />
 
      <div className="content" style={{display: 'flex'}}>
        {children}

        <LeftsideWidget/>

      </div>

    </div>
  );
};



export default App;