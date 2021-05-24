export const state = () => ({
  uid: null,
  cartCount: 0,
})

export const mutations = {
  setUid(state, payload) {
    state.uid = payload
  },
  setCartCount(state, payload) {
    state.cartCount = payload
  },
  incCartCount(state) {
    state.cartCount++
  },
  decCartCount(state) {
    state.cartCount--
  },
  clear(state) {
    state.cartCount = 0
    state.uid = null
  },
}

export const getters = {
  getCartCount: (state) => {
    return state.cartCount
  },
  getUid: (state) => {
    return state.uid
  },
}
