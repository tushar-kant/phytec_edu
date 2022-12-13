import React, { createContext, useReducer, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import { initialState, reducer } from '../src/reducer/UseReducer';
import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/react";

export const UserContext = createContext();
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  
`;


const Routing = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/about">
        <About />
      </Route>

      <Route path="/contact">
        <Contact />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>

    </Switch>

  )
}


const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)

    }, 2000)
  }, [])

  return (

    <>
      {
        loading ?

          <PropagateLoader
            css={override}
            size={30}
            color={"#123abc"}
            loading={loading}

          />



          :


          <UserContext.Provider value={{ state, dispatch }}>
            <Navbar />
            <Routing />

          </UserContext.Provider>
      }
    </>
  )
}

export default App

