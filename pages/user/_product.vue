<template>
  <v-app>
    <!--  img section start here -->
    <v-row dense justify="center">
      <v-col md="5" class="mt-4">
        <h2 class="my-2">Product Images</h2>
        <v-carousel
          height="400"
          hide-delimiter-background
          :show-arrows="items.length > 0"
          :hide-delimiters="items.length == 0"
          class="slider"
        >
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade"
          ></v-carousel-item>

          <v-carousel-item v-if="!checkItemLength">
            <v-sheet color="light blue" height="100%" tile>
              <v-row class="fill-height" align="center" justify="center">
                <div class="sheet">Products Image is Not Available</div>
              </v-row>
            </v-sheet></v-carousel-item
          >
        </v-carousel>
      </v-col>
      <!-- img section end here -->
      <!-- product details starts here -->
      <v-col md="5" class="mt-6">
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <h1 v-bind="attrs" class="mt-9" v-on="on">{{ productName }}</h1>
          </template>
          <span>Product Name</span>
        </v-tooltip>
        <p>By {{ productCompanyName }}</p>
        <br />
        <v-row align="center" class="mb-2 mx-0">
          <v-rating
            :value="rating"
            color="amber"
            dense
            half-increments
            readonly
            size="25"
          ></v-rating>

          <div class="grey--text ml-4">5</div>
        </v-row>
        <br />
        <h2>{{ productPrice }} <v-icon>mdi-currency-inr</v-icon></h2>
        <br />
        <h3>Discription</h3>
        <p>
          {{ productDiscription }}
        </p>

        <v-btn block type="submit" color="primary">Add To Cart</v-btn>
      </v-col>
    </v-row>
    <v-row dense justify="center">
      <v-col md="10" class="mb-5" style="height: fit-content">
        <v-expansion-panels focusable>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <b>Product Details</b>
              <template #actions>
                <v-icon color="primary"> $expand </v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row dense justify="center">
                <v-col md="5" class="mt-0" align="center">
                  <h3>Product Name :</h3>
                </v-col>
                <v-col md="5" class="mt-0">{{ productName }}</v-col>
              </v-row>
              <v-row dense justify="center">
                <v-col md="5" class="mt-0" align="center">
                  <h3>Company :</h3>
                </v-col>
                <v-col md="5" class="mt-0">{{ productCompanyName }}</v-col>
              </v-row>
              <v-row dense justify="center">
                <v-col md="5" class="mt-0" align="center">
                  <h3>Category :</h3>
                </v-col>
                <v-col md="5" class="mt-0">{{ productCatogory }}</v-col>
              </v-row>
              <v-row dense justify="center">
                <v-col md="5" class="mt-0" align="center">
                  <h3>Type :</h3>
                </v-col>
                <v-col md="5" class="mt-0">{{ productType }}</v-col>
              </v-row>
              <v-row dense justify="center">
                <v-col md="5" class="mt-0" align="center">
                  <h3>Model No. :</h3>
                </v-col>
                <v-col md="5" class="mt-0">{{ productModelNo }}</v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <b> Product Discription</b>
              <template #actions>
                <v-icon color="primary"> $expand </v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              {{ productDiscription }}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <!-- product details end here -->
    </v-row>
  </v-app>
</template>

<script>
import { db } from '../../plugins/firebase'
export default {
  data() {
    return {
      productName: null,
      productCatogory: null,
      productPrice: null,
      productModelNo: null,
      productDiscription: null,
      productCompanyName: null,
      productType: null,
      items: [], // img uls
      rating: 5,
    }
  },
  computed: {
    checkItemLength() {
      if (this.items.length > 0) return true
      return false
    },
  },
  created() {
    this.getData()
  },
  methods: {
    // get data from db
    // TODO: if poduct data not found than reditrect to product list page
    getData() {
      db.ref('adminUserName/products/' + this.$route.params.product).on(
        'value',
        (snapshot) => {
          const product = snapshot.val()
          this.productName = product.name
          this.productCatogory = product.category
          this.productPrice = product.price
          this.productModelNo = product.modelNo
          this.productDiscription = product.discription
          this.productCompanyName = product.company
          this.productType = product.type
          this.items = product.imgUrls
          // eslint-disable-next-line no-console
          console.log(product)
        }
      )
    },
  },
}
</script>
