<template>
  <!-- card for product in main page *index view* -->
  <v-card
    :elevation="hoverr ? 12 : 2"
    :loading="false"
    class="mx-auto my-12"
    max-width="374"
    min-width="374"
  >
    <v-carousel
      continuous
      cycle
      :show-arrows="false"
      hide-delimiter-background
      delimiter-icon="mdi-minus"
      height="300"
    >
      <v-carousel-item v-if="checkItemLength(product)">
        <v-sheet color="lighter sky blue" height="100%" tile>
          <v-row class="fill-height" align="center" justify="center">
            <div class="sheet">Product Images are not Available</div>
          </v-row>
        </v-sheet>
        <!-- sheet containing price -->
        <v-expand-transition>
          <div
            v-if="hoverr"
            class="
              d-flex
              transition-fast-in-fast-out
              primary
              darken-2
              v-card--reveal
              display-3
              white--text
            "
            style="height: 100%"
          >
            {{ product.price }}
            <v-icon class="display-3 white--text">mdi-currency-inr</v-icon>
          </div>
        </v-expand-transition></v-carousel-item
      >
      <!-- product Image will be rendered here -->
      <v-carousel-item
        v-for="(item, i) in product.imgUrls"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade"
      >
        <v-expand-transition>
          <div
            v-if="hoverr"
            class="
              d-flex
              transition-fast-in-fast-out
              primary
              darken-2
              v-card--reveal
              display-3
              white--text
            "
            style="height: 100%"
          >
            {{ product.price }}
            <v-icon class="display-3 white--text">mdi-currency-inr</v-icon>
          </div>
        </v-expand-transition></v-carousel-item
      >
    </v-carousel>
    <!-- product pictre section ended -->
    <!-- Product details section start -->
    <v-row justify="center">
      <!-- add to cart button start -->
      <v-dialog v-model="dialog" persistent max-width="500">
        <template #activator="{ on, attrs }">
          <v-btn
            absolute
            color="primary"
            class="white--text"
            fab
            large
            right
            style="top: 255px"
            v-bind="attrs"
            v-on="on"
            @click="addToCart(product.modelNo)"
          >
            <v-icon>mdi-cart-plus</v-icon>
          </v-btn>
        </template>
        <!-- add to cart button end here -->
        <!-- add to cart button dialog box start here -->
        <v-card>
          <v-card-title>
            <v-icon>mdi-check</v-icon>Added to Cart Successfully
          </v-card-title>
          <v-card-text>
            <div class="successlogo"></div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn style="color: lightskyblue" text @click="dialog = false">
              Continue Shopping
            </v-btn>
            <v-btn color="light blue white--text" depressed href="/user/cart">
              Goto Cart
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- add to cart button dialog box end here -->
    </v-row>
    <!-- product details start here (main card body) -->
    <v-card-title>
      <span class="mt-2">{{ product.name }} </span></v-card-title
    >
    <!-- hover to activate price sheet that transit on product mage \\ hover area start here -->
    <v-hover v-slot="{ hover }">
      <v-card-text
        :v-if="hover ? hoverTrue() : hoverFalse()"
        @click="$router.push(`/user/${product.modelNo}`)"
      >
        <v-row align="center" class="mx-0"> By {{ product.company }}</v-row>
        <v-row align="center" class="mx-0">
          <v-rating
            :value="rating"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div class="grey--text ml-4">5</div>
        </v-row>

        <div class="my-4 subtitle-1">
          {{ product.price
          }}<v-icon class="subtitle-1">mdi-currency-inr</v-icon>
        </div>

        <div>
          {{ product.discription }}
        </div>
      </v-card-text>
    </v-hover>
    <!-- hover area and product details section (main body card) ends here -->
  </v-card>
</template>

<script>
import { db } from '../plugins/firebase'
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialog: false, // for the add to cart
      rating: 5, // will be added by db in future update now static
      hoverr: false, // use to trigger v-hover for price sheet on product img corousol
      sproduct: {}, // indicate singal product data
    }
  },
  methods: {
    // to trigger sheet on product img data come from v-hover than passed to varable for shhet to react
    hoverTrue() {
      this.hoverr = true
      return true
    },
    hoverFalse() {
      this.hoverr = false
      return true
    },
    // method will add selected products data to users profile on db (data will be fetched first to send off to profiles)
    async addToCart(modelNo) {
      const uid = this.$store.getters['cart/getUid']
      await db
        .ref(`adminUserName/products/${modelNo}`)
        .on('value', (snapshot) => {
          const data = snapshot.val()
          if (data) {
            // const temp = Object.keys(data).map((i) => data[i])
            this.sproduct = data
            // eslint-disable-next-line no-console
            console.log(uid)
            db.ref(`users/${uid}/cartProduct/${modelNo}`).once(
              'value',
              (snapshot) => {
                const data = snapshot.val()
                if (data) {
                  // eslint-disable-next-line no-console
                  console.log('in condition of cart is there or not')
                } else {
                  db.ref(`users/${uid}/cartProduct/${modelNo}`)
                    .set(this.sproduct)
                    .then(() => {
                      // eslint-disable-next-line no-console
                      console.log('success adding cart model no ' + modelNo)
                      this.$store.commit('cart/incCartCount')
                      let temp = this.$cookies.get('cartCount')
                      this.$cookies.set('cartCount', ++temp)
                    })
                    .catch((error) => {
                      // eslint-disable-next-line no-console
                      console.log(
                        'Error deleting cart model no ' + modelNo,
                        error
                      )
                      // TODO: make alert tost when there is failur in adding data to firestore
                      // this.alert = true
                      // setTimeout(() => {
                      //   this.alert = false
                      // }, 5000)
                    })
                }
              }
            )
          }
        })
      // COMPLATED: WORKED ON THE FUNCTION FOR FETCHIING AND STORING DATA OF PRODUCT IN THE CART
      // const uid = this.$store.getters['cart/getUid']
      // eslint-disable-next-line no-console
      // console.log(uid)
      // const updates = {}
      // updates[`/${modelNo}`] = this.sproduct

      // db.ref(`users/${uid}/cartProduct`)
      //   .update(updates)
      // db.ref(`users/${uid}/cartProduct/${modelNo}`)
      //   .set(this.sproduct)
      //   .then(() => {
      //     // eslint-disable-next-line no-console
      //     console.log('success adding cart model no ' + modelNo)

      //     this.$store.commit('cart/incCartCount')
      //     let temp = this.$cookies.get('cartCount')
      //     this.$cookies.set('cartCount', ++temp)
      //   })
      //   .catch((error) => {
      //     // eslint-disable-next-line no-console
      //     console.log('Error deleting cart model no ' + modelNo, error)
      //     // make alert tost when there is failur in adding data to firestore
      //     // this.alert = true
      //     // setTimeout(() => {
      //     //   this.alert = false
      //     // }, 5000)
      //   })
    },
    // function for checking if image available or not (direct chking was giving some issues)
    checkItemLength(product) {
      if (product.imgUrls) {
        if (product.imgUrls.length === 0) {
          return true
        }
        return false
      } else {
        return true
      }
    },
  },
}
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.85;
  position: absolute;
  width: 100%;
}
.successlogo {
  min-width: auto;
  min-height: 250px;

  background-size: cover;
  background-image: url('https://i.gifer.com/7efs.gif');
}
</style>
