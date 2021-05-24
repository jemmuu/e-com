<template>
  <v-app>
    <!-- main card which hold table of product list -->
    <!-- TODO: product quentity will be added in further versions -->
    <v-card elevation="0" style="margin: 30px">
      <v-card-title>
        Product List
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              x-small
              fab
              class="mt-4 ml-1"
              color="primary"
              to="/admin/addProduct"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Add product</span>
        </v-tooltip>
      </v-card-title>
      <v-data-table :headers="headers" :items="products" :search="search">
        <template #item="props">
          <tr>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.company }}</td>
            <td>{{ props.item.category }}</td>
            <td>{{ props.item.type }}</td>
            <td>{{ props.item.modelNo }}</td>
            <td>{{ props.item.price }}</td>
            <td>
              <v-icon
                small
                class="mr-2"
                @click="editProduct(props.item.modelNo)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="deleteProduct(props.item.modelNo, props.item.imgUrls)"
              >
                mdi-delete
              </v-icon>
            </td>
          </tr>
        </template></v-data-table
      >
      <!-- <v-data-table
        :headers="headers"
        :items="products"
        :search="search"
      ></v-data-table> -->
    </v-card>
  </v-app>
</template>

<script>
import { db, storage } from '../../plugins/firebase'
export default {
  data() {
    return {
      search: '', // hold search input value
      headers: [
        {
          text: 'Product Name',
          align: 'start',
          value: 'name',
        },
        { text: 'Company Name', value: 'company' },
        { text: 'Product Category', value: 'category' },
        { text: 'Type', value: 'type' },
        { text: 'Model No', value: 'modelNo' },
        { text: 'Price', value: 'price' },
        { text: 'Actions', value: 'action', sortable: false },
      ], // array for table
      products: [], // hold product data
      temp: null, // to use in function
    }
  },
  // to load product data
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
    // redired to edit product page
    editProduct(no) {
      this.$router.push(`/admin/${no}`)
    },
    // delete product data from db and imgs from storage
    deleteProduct(modelNo, url) {
      this.temp = modelNo
      if (url) {
        const urls = Object.keys(url).map((i) => url[i])
        // eslint-disable-next-line no-console
        console.log(urls)
        for (const surl of urls) {
          // eslint-disable-next-line no-console
          console.log(surl.src)
          storage
            .refFromURL(surl.src)
            .delete()
            .then(() => {
              // eslint-disable-next-line no-console
              console.log('success deleting image and model no ' + modelNo)
              // const index = this.products.findIndex(function (item, modelNo) {
              //   return item.modelNo === modelNo
              // })
              // // eslint-disable-next-line no-console
              // console.log(index)
              // this.products.splice(this.products.findIndex(findIn(modelNo)), 1)
              // function findIn(modelNo) {
              //   return function (item) {
              //     // eslint-disable-next-line no-console
              //     console.log(item.modelNo)
              //     return item.modelNo === modelNo
              //   }
              // }
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.log('Error deleting image', error)
            })
        }
      }
      db.ref('adminUserName/products/' + modelNo)
        .remove()
        .then(() => {
          // eslint-disable-next-line no-console
          console.log(
            `success deleting record model no is ${modelNo} and product array length is ${this.products.length}`
          )
          // eslint-disable-next-line no-console
          console.log(this.products[0].modelNo)
          if (this.products.length === 1) {
            if (this.products[0].modelNo === modelNo) this.products = []
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('Error deleting product rtdb', error)
        })
    },
  },
}
</script>

<style></style>
