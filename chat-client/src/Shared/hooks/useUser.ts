const useUser = () => ({
  isLoggedIn: localStorage.getItem('jwt') !== null
})

export default useUser
