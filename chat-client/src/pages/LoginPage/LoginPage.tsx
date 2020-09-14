import React, { useState, FunctionComponent } from 'react'
import { Container, Paper, TextField, Button } from '@material-ui/core'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import config from 'Shared/config'

const LoginPage: FunctionComponent = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  const handleSubmit = async () => {
    const response = await axios.post(`${config.serverUrl}/auth/login`, {
      userName,
      password
    })

    localStorage.setItem('jwt', response.data)
    setLoggedIn(true)
  }

  if (loggedIn) {
    return <Redirect to="/chat" />
  }

  return (
    <Container maxWidth="xs">
      <Paper style={{ marginTop: 40 }}>
        <TextField
          style={{ marginBottom: 8 }}
          fullWidth
          label="Username"
          variant="outlined"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
        <TextField
          style={{ marginBottom: 8 }}
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Log in
        </Button>
      </Paper>
    </Container>
  )
}

export default LoginPage
