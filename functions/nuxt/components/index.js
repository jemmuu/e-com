import { wrapFunctional } from './utils'

export { default as BillingCard } from '../..\\components\\billingCard.vue'
export { default as CartCard } from '../..\\components\\cartCard.vue'
export { default as ProductCard } from '../..\\components\\productCard.vue'
export { default as Slider } from '../..\\components\\slider.vue'

export const LazyBillingCard = import('../..\\components\\billingCard.vue' /* webpackChunkName: "components/billing-card" */).then(c => wrapFunctional(c.default || c))
export const LazyCartCard = import('../..\\components\\cartCard.vue' /* webpackChunkName: "components/cart-card" */).then(c => wrapFunctional(c.default || c))
export const LazyProductCard = import('../..\\components\\productCard.vue' /* webpackChunkName: "components/product-card" */).then(c => wrapFunctional(c.default || c))
export const LazySlider = import('../..\\components\\slider.vue' /* webpackChunkName: "components/slider" */).then(c => wrapFunctional(c.default || c))
