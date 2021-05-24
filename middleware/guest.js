export default function ({ store, redirect }) {
  // to securely send logged in user on homepage
  if (store.state.auth.logedIn === true) {
    // eslint-disable-next-line no-console
    console.log(store.state.auth)
    redirect('/')
  }
}
