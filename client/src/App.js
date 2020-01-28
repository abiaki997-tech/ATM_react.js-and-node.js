import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import Container from './compnents/Container/container'
import Home from './compnents/Home/home'
import Password from './compnents/Password_Change/P_C'
import AuthState from './context/auth/authstate'
import AccState from './context/account/accstate'

function App() {
  return (
    <div className="App">
     <AuthState> 
       <AccState>
          <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/container" component={Container} />
            </Switch>
            <Route exact path="/password" component={Password} />
            </Router>
     </AccState>
    </AuthState>  
         
    </div>
  );
}

export default App;
