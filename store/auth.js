export const state = () => ({
  logedIn: false,
})

export const mutations = {
  setLogedIn(state, payload) {
    state.logedIn = payload
  },
  clear(state) {
    state.logedIn = false
  },
}

export const getters = {
  getLogedIn: (state) => {
    return state.logedIn
  },
}
