import jwt_decode from 'jwt-decode'

const useUser = () => {
  const jwt = localStorage.getItem('jwt')

  return {
    isLoggedIn: jwt !== null,
    currentUser: jwt
      ? (jwt_decode(jwt) as { userName: string }).userName
      : undefined
  }
}

export default useUser
