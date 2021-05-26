import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _9589c046 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _ecf8922c = () => interopDefault(import('..\\pages\\team.vue' /* webpackChunkName: "pages/team" */))
const _4aecff20 = () => interopDefault(import('..\\pages\\admin\\addProduct.vue' /* webpackChunkName: "pages/admin/addProduct" */))
const _93e1b1ea = () => interopDefault(import('..\\pages\\admin\\productList.vue' /* webpackChunkName: "pages/admin/productList" */))
const _22a57d44 = () => interopDefault(import('..\\pages\\auth\\login.vue' /* webpackChunkName: "pages/auth/login" */))
const _d30535d0 = () => interopDefault(import('..\\pages\\auth\\register.vue' /* webpackChunkName: "pages/auth/register" */))
const _d4234010 = () => interopDefault(import('..\\pages\\user\\cart.vue' /* webpackChunkName: "pages/user/cart" */))
const _05828182 = () => interopDefault(import('..\\pages\\admin\\_editProductModelNo.vue' /* webpackChunkName: "pages/admin/_editProductModelNo" */))
const _f9391ef0 = () => interopDefault(import('..\\pages\\user\\_product.vue' /* webpackChunkName: "pages/user/_product" */))
const _f82a0ed6 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/inspire",
    component: _9589c046,
    name: "inspire"
  }, {
    path: "/team",
    component: _ecf8922c,
    name: "team"
  }, {
    path: "/admin/addProduct",
    component: _4aecff20,
    name: "admin-addProduct"
  }, {
    path: "/admin/productList",
    component: _93e1b1ea,
    name: "admin-productList"
  }, {
    path: "/auth/login",
    component: _22a57d44,
    name: "auth-login"
  }, {
    path: "/auth/register",
    component: _d30535d0,
    name: "auth-register"
  }, {
    path: "/user/cart",
    component: _d4234010,
    name: "user-cart"
  }, {
    path: "/admin/:editProductModelNo?",
    component: _05828182,
    name: "admin-editProductModelNo"
  }, {
    path: "/user/:product?",
    component: _f9391ef0,
    name: "user-product"
  }, {
    path: "/",
    component: _f82a0ed6,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
