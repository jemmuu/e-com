<template>
  <v-app>
    <div v-if="total !== 0" class="justify-center">
      <h1 style="text-align: center">List Of items</h1>
    </div>
    <!-- alert if there is some error at deleting item on db -->
    <v-alert
      dense
      outlined
      type="error"
      max-width="400"
      class="ma-auto"
      :value="alert"
    >
      There is Some problem With removing item Please
      <strong>try again </strong>
    </v-alert>
    <div>
      <!-- empty card start here -->
      <v-card
        v-if="total === 0"
        class="mx-auto mt-5"
        max-width="900px"
        outlined
      >
        <v-img
          class="black--text align-end"
          height="400px"
          src="https://www.dentalproducts.ge/images/bg/shopping_cart_empty.jpg"
        >
        </v-img>
      </v-card>
      <!-- empty card end here -->
    </div>
    <div v-for="(product, index) in products" :key="product.modelNo">
      <!-- <v-card class="mx-auto mt-5" max-width="900px" outlined>
        <v-list-item three-line>
          <v-list-item-avatar tile height="150" width="200">
            <v-img
              :src="product.imgUrls[0].src"
              alt="Image is not available"
              height="150"
              width="200"
              contain
            ></v-img
          ></v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline mt-n4 mb-1">
              <h4>{{ product.name }}</h4>
              <v-divider></v-divider>
            </v-list-item-title>

            <v-subheader>
              <div class="mt-4">
                By {{ product.company }}
                <div class="mt-4">
                  <v-row>
                    <v-rating
                      :value="rating"
                      color="amber"
                      half-increments
                      readonly
                    ></v-rating>
                    <div class="mt-1 ml-4 text-h6">5</div>
                  </v-row>
                </div>
                <div class="mt-2 text-h6"></div>
                <div class="mt-2 text-h6">
                  {{ product.price }} <v-icon>mdi-currency-inr</v-icon>
                </div>
                <div class="mt-2">
                  <v-text-field
                    v-model="quantity"
                    dense
                    class="centered-input"
                    height="30px"
                    style="width: 100px;text-align; center; min-height: 30px !important"
                    type="number"
                    ><v-icon
                      slot="append"
                      small
                      color="red"
                      class="mt-1"
                      @click="quantity++"
                    >
                      mdi-plus
                    </v-icon>
                    <v-icon
                      slot="prepend-inner"
                      small
                      color="green"
                      class="mt-1 mr-4"
                      @click="quantity--"
                    >
                      mdi-minus
                    </v-icon></v-text-field
                  >
                </div>
              </div>
            </v-subheader>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" rounded> Remove From Cart </v-btn>
        </v-card-actions>
      </v-card> -->
      <cartCard
        :product="product"
        @removeFromCart="removeFromCart($event, index)"
      ></cartCard>
    </div>
    <billingCard :total="total"></billingCard>
  </v-app>
</template>

<script>
import billingCard from '../../components/billingCard'
import cartCard from '../../components/cartCard'
import { db } from '../../plugins/firebase'
export default {
  components: {
    billingCard,
    cartCard,
  },
  // asyncData({ store }) {
  //   // eslint-disable-next-line no-console
  //   console.log('in async')
  //   const uid = store.getters['cart/getUid']
  //   let temp = []
  //   db.ref(`users/${uid}/cartProduct`).once('value', (snapshot) => {
  //     const data = snapshot.val()
  //     if (data) {
  //       // eslint-disable-next-line no-console
  //       console.log(data)
  //       temp = Object.keys(data).map((i) => data[i])

  //       // eslint-disable-next-line no-console
  //       console.log(temp)
  //     }
  //   })
  //   // eslint-disable-next-line no-console
  //   console.log(uid)
  //   return {
  //     products: temp,
  //   }
  // },
  data() {
    return {
      total: 0,
      products: [],
      rating: 5,
      quantity: 1,
      alert: false,
    }
  },
  created() {
    // getting data from db carted products
    const uid = this.$store.getters['cart/getUid']
    db.ref(`users/${uid}/cartProduct`).once('value', (snapshot) => {
      const data = snapshot.val()
      if (data) {
        // eslint-disable-next-line no-console
        console.log(data)
        this.products = Object.keys(data).map((i) => data[i])
        // this.$store.commit('cart/setCartCount', this.modelNos.length)
        // this.$cookies.set('cartCount', this.modelNos.length)
        // eslint-disable-next-line no-console
        // console.log(this.modelNos)
        // for (const modelNo of this.modelNos) {
        //   // eslint-disable-next-line no-console
        //   console.log(modelNo + 'in loop')
        //   db.ref(`adminUserName/products/${modelNo}`).once(
        //     'value',
        //     (snapshot) => {
        //       const data = snapshot.val()
        //       if (data) {
        //         // const temp = Object.keys(data).map((i) => data[i])
        //         this.products.push(data)
        // eslint-disable-next-line no-console
        console.log(this.products)
        for (const product of this.products) {
          this.total = this.total + parseFloat(product.price)
        }
        //       }
        //     }
        //   )
        // }
      }
    })
  },
  methods: {
    // remove cart product on user profile in db
    removeFromCart(modelNo, i) {
      const uid = this.$store.getters['cart/getUid']
      db.ref(`users/${uid}/cartProduct/${modelNo}`)
        .remove()
        .then(() => {
          // eslint-disable-next-line no-console
          console.log('success deleting cart model no ' + modelNo)
          this.total = this.total - parseFloat(this.products[i].price)
          this.products.splice(i, 1)

          this.$store.commit('cart/decCartCount')
          let temp = this.$cookies.get('cartCount')
          this.$cookies.set('cartCount', --temp)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('Error deleting cart model no ' + modelNo, error)
          this.alert = true
          setTimeout(() => {
            this.alert = false
          }, 5000)
        })
    },
    // totalAmount() {
    //   for (const product of this.products) {
    //     this.total = this.total + product.price
    //   }
    //   return this.total
    // },
  },
}
</script>

<style></style>
