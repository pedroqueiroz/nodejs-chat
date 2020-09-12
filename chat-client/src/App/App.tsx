import React, { useState, useEffect, FunctionComponent } from 'react'
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'

import UserMessageInput from './components/UserMessageInput/UserMessageInput'
import { ChatMessage } from 'types/chat'

import './App.css'

const SERVER_ADDRESS = 'ws://localhost:8080'
const CURRENT_USER = 'Pedro'

const webSocket = new WebSocket(SERVER_ADDRESS)

const App: FunctionComponent = () => {
  const [isReady, setIsReady] = useState(false)
  const [messages, setMessages] = useState<Array<ChatMessage>>([])
  const [userMessage, setUserMessage] = useState<string>('')

  useEffect(() => {
    webSocket.onopen = () => setIsReady(true)

    webSocket.onmessage = (event) => {
      setMessages([...messages, JSON.parse(event.data)])
    }
  })

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
          handleSubmit={() => {
            webSocket.send(
              JSON.stringify({
                userName: CURRENT_USER,
                message: userMessage,
              })
            )
            setUserMessage('')
          }}
        />
      </Paper>
    </Container>
  )
}

export default App
