import React, { SyntheticEvent, FunctionComponent } from 'react'
import { IconButton, InputAdornment, TextField } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'

type UserMessageInputProps = {
  userMessage: string
  setUserMessage: (value: string) => void
  handleSubmit: (event: SyntheticEvent) => void
}

const UserMessageInput: FunctionComponent<UserMessageInputProps> = ({
  userMessage,
  setUserMessage,
  handleSubmit,
}: UserMessageInputProps) => {
  return (
    <TextField
      label="Your message"
      multiline
      fullWidth
      rows={4}
      variant="outlined"
      value={userMessage}
      onChange={(event) => {
        setUserMessage(event.target.value)
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label="send" onClick={handleSubmit}>
              <SendIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

export default UserMessageInput
