export default function ({ route, store, redirect }) {
  // to enter in register page without login
  if (route.name === 'auth-register') {
    return null
  }

  // to pass authentication resposibility to guest.js
  if (route.name === 'auth-login') {
    return null
  }
  // to restrict unauth user
  if (!store.state.auth.logedIn) {
    redirect('/auth/login')
  }

  if (store.state.auth.logedIn) {
    if (store.state.auth.admin) {
      if (route.fullPath.includes('/admin')) {
        return null
      } else if (route.name === 'team') {
        return null
      } else {
        redirect('/admin/adminPanel')
      }
    } else if (!store.state.auth.admin) {
      if (route.fullPath.includes('/admin')) {
        redirect('/')
      } else {
        return null
      }
    }
  }
}
