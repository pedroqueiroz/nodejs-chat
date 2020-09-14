import React, { FunctionComponent } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import ChatPage from 'pages/ChatPage/ChatPage'

import './App.css'

const App: FunctionComponent = () => (
  <Router>
    <Switch>
      <Route path="/chat">
        <ChatPage />
      </Route>
    </Switch>
  </Router>
)

export default App
