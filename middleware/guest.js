export default function ({ store, redirect, route }) {
  // eslint-disable-next-line no-console
  console.log(route.fullPath.includes('/auth'))
  // to securely send logged in user on homepage
  if (store.state.auth.logedIn === true) {
    redirect('/')
  }
}
