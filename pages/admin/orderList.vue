<template>
  <v-app>
    <!-- main card which hold table of product list -->
    <v-card elevation="0" style="margin: 30px">
      <v-card-title>
        Order List
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="orders" :search="search">
        <template #item="props">
          <tr>
            <td>{{ props.item.orderNo }}</td>
            <td>{{ props.item.custName }}</td>
            <!-- <td>{{ props.item.productcategory }}</td> -->
            <td>{{ print(props.item.productcategory) }}</td>
            <td>{{ props.item.orderType }}</td>
            <td>{{ print(props.item.modelNos) }}</td>
            <td>
              {{ props.item.totalAmount
              }}<v-icon small>mdi-currency-inr</v-icon>
            </td>
            <td>
              <v-icon
                small
                class="mr-2"
                @click="editProduct(props.item.orderNo)"
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
  layout: 'adminLayout',
  data() {
    return {
      search: '', // hold search input value
      headers: [
        {
          text: 'Order No',
          align: 'start',
          value: 'orderNo',
        },
        { text: 'Customer Name', value: 'custName' },
        { text: 'Product Category', value: 'productcategory' },
        { text: 'Order Type', value: 'orderType' },
        { text: 'Model Nos', value: 'modelNos' },
        { text: 'Total Amount', value: 'totalAmount' },
        { text: 'Actions', value: 'action', sortable: false },
      ], // array for table
      orders: [], // hold product data
      temp: null, // to use in function
    }
  },
  // to load product data
  async fetch() {
    // eslint-disable-next-line no-console
    console.log(this.$route.params.orderlistType)
    await db
      .ref('adminUserName/orders')
      .orderByChild('orderProccess')
      .equalTo('proccess')
      .on('value', (snapshot) => {
        const data = snapshot.val()
        if (data) {
          // eslint-disable-next-line no-console
          console.log(data)
          this.orders = Object.keys(data).map((i) => data[i])
        }
      })
    // eslint-disable-next-line no-console
    console.log(this.orders)
  },
  created() {
    // eslint-disable-next-line no-console
    console.log(this.$route.params.orderlistType)
  },
  methods: {
    print(object) {
      const temp = Object.keys(object).map((i) => object[i])
      let string = ''
      for (const data of temp) {
        string = string + data + ','
      }
      return string
      //   return object
    },
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
