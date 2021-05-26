<template>
  <v-app>
    <v-row class="mt-6 mx-5">
      <v-col>
        <v-card
          class="mt-2 ml-2"
          color="#82BB1F"
          dark
          min-width="240"
          max-width="300"
        >
          <v-card-title>
            <v-icon large left> mdi-cart-variant </v-icon>
            <span class="title font-weight-light">Total Products</span>
          </v-card-title>

          <v-card-text class="text-center text-h1 font-weight-bold">
            {{ products.length }}
          </v-card-text>

          <v-card-actions>
            <v-row align="center" justify="end" @click="redirectToList">
              <span class="subheading mr-2">Check out Product</span>
              <v-icon x-large class="mr-4"> mdi-arrow-right </v-icon>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="mt-2 ml-2"
          color="#26c6da"
          dark
          min-width="240"
          max-width="300"
        >
          <v-card-title>
            <v-icon large left> mdi-cart-plus </v-icon>
            <span class="title font-weight-light">New Orders</span>
          </v-card-title>

          <v-card-text class="text-center text-h1 font-weight-bold">
            0
          </v-card-text>

          <v-card-actions>
            <v-row
              align="center"
              justify="end"
              @click="
                $router.push({
                  name: 'admin-orderList',
                  params: { orderlistType: 'new order' },
                })
              "
            >
              <span class="subheading mr-2">Check out new Orders</span>
              <v-icon x-large class="mr-4"> mdi-arrow-right </v-icon>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="mt-2 ml-2"
          color="#7DFFF7"
          dark
          min-width="240"
          max-width="300"
        >
          <v-card-title>
            <v-icon large left> mdi-cart-arrow-right </v-icon>
            <span class="title font-weight-light">Orders in Proccess</span>
          </v-card-title>

          <v-card-text class="text-center text-h1 font-weight-bold">
            0
          </v-card-text>

          <v-card-actions>
            <v-row align="center" justify="end">
              <span class="subheading mr-2">Orders List </span>
              <v-icon x-large class="mr-4"> mdi-arrow-right </v-icon>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="mt-2 ml-2"
          color="success"
          dark
          min-width="240"
          max-width="300"
        >
          <v-card-title>
            <v-icon large left> mdi-cart-check </v-icon>
            <span class="title font-weight-light">Complated Orders</span>
          </v-card-title>

          <v-card-text class="text-center text-h1 font-weight-bold">
            0
          </v-card-text>

          <v-card-actions>
            <v-row align="center" justify="end">
              <span class="subheading mr-2">Orders List</span>
              <v-icon x-large class="mr-4"> mdi-arrow-right </v-icon>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { db } from '../../plugins/firebase'
export default {
  layout: 'adminLayout',
  data() {
    return {
      products: [],
    }
  },
  async fetch() {
    await db.ref('adminUserName/products').on('value', (snapshot) => {
      const data = snapshot.val()
      if (data) {
        this.products = Object.keys(data).map((i) => data[i])
      }
    })
    // eslint-disable-next-line no-console
    console.log(this.products)
  },
  methods: {
    redirectToList() {
      this.$router.push('/admin/productList')
    },
  },
}
</script>

<style></style>
