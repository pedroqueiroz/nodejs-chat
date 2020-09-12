import React from 'react'
import {
  Container,
  Paper,
  TextField,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'

import './App.css'

const messages = [
  { userName: 'Pedro', userMessage: 'Hi, welcome!' },
  { userName: 'Hugo', userMessage: 'Hi, thanks! :)' },
]

const App = () => {
  return (
    <Container maxWidth="lg">
      <Paper>
        <List>
          {messages.map(({ userName, userMessage }) => (
            <ListItem>
              <ListItemText primary={userName} secondary={userMessage} />
            </ListItem>
          ))}
        </List>
        <TextField
          label="Your message"
          multiline
          fullWidth
          rows={4}
          variant="outlined"
        />
      </Paper>
    </Container>
  )
}

export default App
