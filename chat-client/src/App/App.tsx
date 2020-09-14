import React, { FunctionComponent } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import HomePage from 'pages/HomePage/HomePage'
import LoginPage from 'pages/LoginPage/LoginPage'
import ChatPage from 'pages/ChatPage/ChatPage'

import './App.css'

const App: FunctionComponent = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="/chat">
        <ChatPage />
      </Route>
    </Switch>
  </Router>
)

export default App
