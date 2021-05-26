export const actions = {
  nuxtServerInit({ commit }, { req, app: { $cookies } }) {
    if (req.headers.cookie) {
      if ($cookies.get('cartCount')) {
        const cartCount = $cookies.get('cartCount')
        commit('cart/setCartCount', cartCount)
      }
      if ($cookies.get('uid')) {
        const uid = $cookies.get('uid')
        commit('cart/setUid', uid)
      }
      if ($cookies.get('logedIn')) {
        const logedIn = $cookies.get('logedIn')
        commit('auth/setLogedIn', logedIn)
      }
      if ($cookies.get('admin')) {
        const admin = $cookies.get('admin')
        commit('auth/setAdmin', admin)
      }
    }
  },
}
