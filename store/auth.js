export const state = () => ({
  logedIn: false,
  admin: false,
})

export const mutations = {
  setLogedIn(state, payload) {
    state.logedIn = payload
  },
  setAdmin(state, payload) {
    state.admin = payload
  },
  clear(state) {
    state.logedIn = false
    state.admin = false
  },
}

export const getters = {
  getLogedIn: (state) => {
    return state.logedIn
  },
}
