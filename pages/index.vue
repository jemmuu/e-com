<template>
  <v-app>
    <div>
      <!-- vutify carousel from component -->
      <slider />
      <v-container>
        <!-- sort functinality ui start here -->
        <v-row class="sortRow">
          <div style="width: fit-content; margin-bottom: 0px">
            <v-select
              v-model="sortValue"
              :items="sort"
              label="Sort By"
              solo
              background-color="primary lighten-4"
              class="sortSelect"
              style="width: fit-content"
              @change="sortMethod"
            ></v-select>
          </div>
        </v-row>
        <!-- sort functinality ui end here -->
        <!-- product grid will start from here -->
        <!-- TODO: look for improvment not looking good while loading images -->
        <v-row class="mt-n3">
          <v-col
            v-for="product in sortArray"
            :key="product.modelNo"
            class="mt-n3 pa-0"
          >
            <productCard :product="product" />
          </v-col>
        </v-row>
        <!-- product gridd will end here -->
      </v-container>
    </div>
  </v-app>
</template>

<script>
import slider from '../components/slider'
import productCard from '../components/productCard'
import { db } from '../plugins/firebase'
export default {
  components: {
    slider,
    productCard,
  },
  // loading data from db on server side
  // FIXME: remove asyncdata if not needed
  async asyncData() {
    // eslint-disable-next-line no-console
    console.log('in async')
    let product = []
    await db.ref('adminUserName/products').on('value', (snapshot) => {
      const data = snapshot.val()
      if (data) {
        // eslint-disable-next-line no-console
        console.log(data)

        product = Object.keys(data).map((i) => data[i])
      }
    })
    // eslint-disable-next-line no-console
    console.log(product)
    return {
      products: product,
    }
  },
  data() {
    return {
      products: [], // all product data array from db
      sortArray: [], // array after sort and filter from searchbox
      sort: [
        'Sort By',
        'Product Name: A-Z',
        'Product Name: Z-A',
        'Price: Hight to Low',
        'Price: Low to High',
      ], // lst of sort avl
      sortValue: '', // selected sort value
    }
  },
  async fetch() {
    await db.ref('adminUserName/products').on('value', (snapshot) => {
      const data = snapshot.val()
      if (data) {
        // eslint-disable-next-line no-console
        console.log(data)
        this.products = Object.keys(data).map((i) => data[i])
      }
    })
    // eslint-disable-next-line no-console
    console.log(this.products)
  },
  // computed: {
  //   ...mapGetters({
  //     searchQuery: 'getSearch',
  //   }),
  // },

  // initializng the sortArray and etting search box input via event bus
  created() {
    this.sortArray = this.products
    this.$bus.$on('search', this.search)
  },
  methods: {
    // unction filter array as user input in search box
    search(string) {
      // eslint-disable-next-line no-console
      // console.log(string.length + ' got change here')
      if (string.length !== 0) {
        // eslint-disable-next-line no-console
        console.log(
          this.sortArray.filter((x) => {
            return x.name.match(string)
          })
        )
        this.sortArray = this.products
        this.sortArray = this.sortArray.filter((x) => {
          return x.name.match(string)
        })
      }
    },
    // function to sort array as per selected sort
    sortMethod() {
      // eslint-disable-next-line no-console
      console.log(this.sortValue)
      if (this.sortValue === 'Sort By') this.sortArray = this.products
      else if (this.sortValue === 'Product Name: A-Z') {
        this.sortArray.sort((a, b) => {
          const fa = a.name.toLowerCase()
          const fb = b.name.toLowerCase()

          if (fa < fb) return -1
          if (fa > fb) return 1
          return 0
        })
      } else if (this.sortValue === 'Product Name: Z-A') {
        this.sortArray.sort((a, b) => {
          const fa = a.name.toLowerCase()
          const fb = b.name.toLowerCase()

          if (fa < fb) return 1
          if (fa > fb) return -1
          return 0
        })
      } else if (this.sortValue === 'Price: Hight to Low') {
        this.sortArray.sort((a, b) => {
          return b.price - a.price
        })
      } else if (this.sortValue === 'Price: Low to High') {
        this.sortArray.sort((a, b) => {
          return a.price - b.price
        })
      }
    },
  },
}
</script>

<style scoped>
.containerProduct {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 2rem;
  max-width: fit-content;
  place-items: center;
}
.cardContainer {
  max-width: 375px;
  /* display: grid; */

  margin: 0px;
}

.sortRow {
  margin: auto;
}
</style>
