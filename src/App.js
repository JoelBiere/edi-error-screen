import React from 'react'
import Body from './components/screens/Body'
import Header from './components/screens/Header'
import {
  BrowserRouter as Router, Route, Switch, Link
} from "react-router-dom";
import Routes from './Routes'

function App() {

  return (
    <Router> 
      <Header />
      <Routes />

    </Router>
  );
}

export default App;
