import React, { FunctionComponent } from 'react'
import { Redirect } from 'react-router-dom'

import useUser from 'Shared/hooks/useUser'

const HomePage: FunctionComponent = () => {
  const { isLoggedIn } = useUser()

  if (isLoggedIn) {
    return <Redirect to="/chat" />
  }

  return <Redirect to="/login" />
}

export default HomePage
