import React, { useState, useEffect, FunctionComponent } from 'react'
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import axios from 'axios'
import config from 'Shared/config'
import { Redirect } from 'react-router-dom'

import UserMessageInput from './components/UserMessageInput/UserMessageInput'
import { ChatMessage } from 'types'

const SERVER_ADDRESS = 'ws://localhost:8080'
const CURRENT_USER = 'Pedro'

const webSocket = new WebSocket(SERVER_ADDRESS)

const ChatPage: FunctionComponent = () => {
  const [isReady, setIsReady] = useState(false)
  const [messages, setMessages] = useState<Array<ChatMessage>>([])
  const [userMessage, setUserMessage] = useState<string>('')
  const [sessionExpired, setSessionExpired] = useState<boolean>(false)

  useEffect(() => {
    webSocket.onopen = () => setIsReady(true)

    webSocket.onmessage = (event) => {
      setMessages([...messages, JSON.parse(event.data)])
    }
  })

  const handleSubmit = async () => {
    await axios
      .post(
        `${config.serverUrl}/posts`,
        {
          userName: CURRENT_USER,
          message: userMessage
        },
        {
          headers: { auth: localStorage.getItem('jwt') }
        }
      )
      .catch(() => setSessionExpired(true))
    setUserMessage('')
  }

  if (sessionExpired) {
    localStorage.removeItem('jwt')
    alert('Your session has expired!')

    return <Redirect to="/login" />
  }

  if (!isReady) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="lg">
      <Paper>
        <List>
          {messages.map(({ userName, message }: ChatMessage, index) => (
            <ListItem key={index}>
              <ListItemText primary={userName} secondary={message} />
            </ListItem>
          ))}
        </List>
        <UserMessageInput
          userMessage={userMessage}
          setUserMessage={setUserMessage}
          handleSubmit={handleSubmit}
        />
      </Paper>
    </Container>
  )
}

export default ChatPage
