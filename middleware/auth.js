export default function ({ route, store, redirect }) {
  // to enter in register page without login
  if (route.name === 'auth-register') {
    return null
  }
  // to pass authentication resposibility to guest.js
  if (route.name === 'auth-login') {
    return null
  }
  // to restruct unauth user
  if (!store.state.auth.logedIn) {
    redirect('/auth/login')
  }
}
