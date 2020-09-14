export const buildChatResponse = ({ userName, message }) =>
  JSON.stringify({
    userName,
    message
  })
