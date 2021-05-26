import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  BillingCard: () => import('../..\\components\\billingCard.vue' /* webpackChunkName: "components/billing-card" */).then(c => wrapFunctional(c.default || c)),
  CartCard: () => import('../..\\components\\cartCard.vue' /* webpackChunkName: "components/cart-card" */).then(c => wrapFunctional(c.default || c)),
  ProductCard: () => import('../..\\components\\productCard.vue' /* webpackChunkName: "components/product-card" */).then(c => wrapFunctional(c.default || c)),
  Slider: () => import('../..\\components\\slider.vue' /* webpackChunkName: "components/slider" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
