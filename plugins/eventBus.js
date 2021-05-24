import Vue from 'vue'

const eventBus = {}
// normal event bus specially made to accomadate search box on main page "index.vue"
eventBus.install = function (Vue) {
  Vue.prototype.$bus = new Vue()
}

Vue.use(eventBus)
