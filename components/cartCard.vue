<template>
  <!-- card design for the list of items in cart  -->
  <v-card class="mx-auto mt-5" max-width="900px" outlined>
    <v-list-item three-line>
      <v-list-item-avatar tile height="150" width="200">
        <v-img
          :src="product.imgUrls ? product.imgUrls[0].src : null"
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
                  @click="quantityMinus"
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
      <v-btn color="red" rounded @click="removeFromCart(product.modelNo)">
        Remove From Cart
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      rating: 5,
      quantity: 1,
    }
  },
  // computed: {
  //   imgUrls() {
  //     if (this.product.imgUrls !== null) {
  //       const urls = this.product.imgUrls
  //       return urls[0].src
  //     } else {
  //       return null
  //     }
  //   },
  // },
  methods: {
    quantityMinus() {
      this.quantity--
    },
    // to emmit event for calling function cart View
    removeFromCart(modelNo) {
      this.$emit('removeFromCart', modelNo)
    },
  },
}
</script>

<style scoped>
.centered-input input {
  text-align: center;
}
</style>
