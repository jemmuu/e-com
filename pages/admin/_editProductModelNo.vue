<template>
  <v-app
    ><v-row dense justify="center">
      <!-- first section of product details start here -->
      <v-col md="5" class="mt-2">
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
            ><v-btn small fab class="ma-2" @click="deleteImage(item.src)"
              ><v-icon>mdi-close</v-icon></v-btn
            ></v-carousel-item
          >

          <v-carousel-item v-if="!checkItemLength">
            <v-sheet color="light blue" height="100%" tile>
              <v-row class="fill-height" align="center" justify="center">
                <div class="sheet">Add Image by clicking below button</div>
              </v-row>
            </v-sheet></v-carousel-item
          >
        </v-carousel>
        <!-- alert for ading image without adding product name -->
        <v-alert
          dense
          outlined
          type="error"
          max-width="400"
          class="ma-auto my-3"
          :value="nameAlert"
        >
          Please Fil<strong> Product name field</strong>
        </v-alert>
        <v-btn
          class="mt-4"
          :disabled="isUploadingImage"
          color="primary"
          @click="launchImageFile"
        >
          {{ isUploadingImage ? 'Uploading...' : 'Add Photos' }}</v-btn
        >
        <!-- This is the real file input element. -->
        <input
          ref="imageFile"
          type="file"
          hidden
          accept="image/png, image/jpeg"
          class="hidden"
          @change.prevent="uploadImageFile($event.target.files)"
        />
      </v-col>
      <!-- first section end here -->
      <!-- product details section start here -->
      <v-col md="5">
        <h2 class="my-2">Product Details</h2>
        <v-form ref="form" class="mx-5 mb-3" @submit.prevent="addProduct">
          <v-text-field
            v-model="form.productName"
            label="Product Name"
            required
            :rules="[rules.name]"
            type="text"
            name="product-name"
            hint="add product name this will be appered as product title"
          ></v-text-field>
          <v-text-field
            v-model="form.productCompanyName"
            :rules="[rules.name]"
            label="Product Company Name"
            placeholder="MI,SAMSUNG,LG..."
            required
          ></v-text-field>
          <v-text-field
            ref="name"
            v-model="form.productCatogory"
            :rules="[rules.name]"
            label="Product Category"
            placeholder="Mobile"
            required
          ></v-text-field>
          <v-text-field
            ref="name"
            v-model="form.productType"
            :rules="[rules.name]"
            label="Product Type"
            placeholder="Homeware,Kitchenware..."
            required
          ></v-text-field>
          <v-text-field
            ref="name"
            v-model="form.productModelNo"
            disabled
            label="Product Model No"
          ></v-text-field>

          <v-text-field
            ref="name"
            v-model="form.productPrice"
            :rules="[rules.name]"
            label="Product Price"
            placeholder="100"
            append-icon="mdi-currency-inr"
            required
          ></v-text-field>
          <v-textarea
            v-model="form.productDiscription"
            label="Add Product Discription"
            :rules="[rules.name]"
          ></v-textarea>
          <v-btn block type="submit" color="primary" :disabled="!formIsValid"
            >Edit Product</v-btn
          ></v-form
        >
      </v-col>
      <!-- detsils section end here -->
    </v-row></v-app
  >
</template>

<script>
import { storage, db } from '../../plugins/firebase'
export default {
  layout: 'adminLayout',
  data() {
    const defaultForm = Object.freeze({
      productName: null,
      productCatogory: null,
      productPrice: null,
      productModelNo: null,
      productDiscription: null,
      productType: null,
      productCompanyName: null,
    }) // form fields

    return {
      form: Object.assign({}, defaultForm), // form fields object
      rules: {
        min: (v) => v.length >= 8 || 'Min 8 characters',
        name: (val) => (val || '').length > 0 || 'This field is required',
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },

      alert: false, // FIXME: possiblity unused variable
      show: false, // FIXME: possiblity unused empty variable
      isUploadingImage: false, // for status of uploading img
      nameAlert: false, // alert box of nul product name while uploading img
      defaultForm,
      items: [], // img url array
      product: null, // FIXME: possiblity unused variable from fetch experiment
    }
  },
  // COMPLATED: tryed to fetch data by fetch hook
  //   async fetch({ params }) {
  //     await db
  //       .ref('adminUserName/products/' + this.$route.params.editProductModelNo)
  //       .on('value', (snapshot) => {
  //         this.product = snapshot.val()
  //         // for (const item in data) {
  //         //   this.products.push(item)
  //         // }
  //         // eslint-disable-next-line no-console
  //         // console.log(this.$route.params.editProductModelNo)
  //       })
  //     // eslint-disable-next-line no-console
  //     console.log(this.product)
  //   },
  computed: {
    checkItemLength() {
      if (this.items.length > 0) return true
      return false
    },
    formIsValid() {
      return (
        this.form.productName &&
        this.form.productCatogory &&
        this.form.productPrice &&
        this.form.productModelNo &&
        this.form.productDiscription &&
        this.form.productCompanyName &&
        this.form.productType
      )
    },
  },
  // fetching product
  created() {
    this.getData()
  },
  methods: {
    // fetching data from db
    // TODO: if poduct data not found than reditrect to product list page
    getData() {
      db.ref(
        'adminUserName/products/' + this.$route.params.editProductModelNo
      ).on('value', (snapshot) => {
        const product = snapshot.val()
        this.form.productName = product.name
        this.form.productCatogory = product.category
        this.form.productPrice = product.price
        this.form.productModelNo = product.modelNo
        this.form.productDiscription = product.discription
        this.form.productCompanyName = product.company
        this.form.productType = product.type
        this.items = product.imgUrls
        // eslint-disable-next-line no-console
        console.log(product)
      })
    },
    // function to trigger hidden file input
    launchImageFile() {
      if (this.form.productName === null) {
        this.nameAlert = true
        setTimeout(() => {
          this.nameAlert = false
        }, 5000)
        return
      }
      // Trigger the file input click event.
      this.$refs.imageFile.click()
    },
    // function binded with hidden file input for uploding img task
    uploadImageFile(files) {
      if (!files.length) {
        return
      }
      const file = files[0]

      if (!file.type.match('image.*')) {
        alert('Please upload an image.')
        return
      }

      const metadata = {
        contentType: file.type,
      }

      this.isUploadingImage = true

      // Creating a reference to the destination where we're uploading
      // the file.
      const imageRef = storage.ref(
        `Productimages/${this.form.productModelNo}/${file.name}`
      )

      const uploadTask = imageRef
        .put(file, metadata)
        .then((snapshot) => {
          // Once the image is uploaded, obtain the download URL, which
          // is the publicly accessible URL of the image.
          return snapshot.ref.getDownloadURL().then((url) => {
            // eslint-disable-next-line no-console
            console.log(url)
            return url
          })
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Error uploading image', error)
        })

      // When the upload ends, pus value in url array
      // and signal that uploading is done.
      uploadTask.then((url) => {
        // eslint-disable-next-line no-console
        console.log(url)
        const newImg = { src: url }
        this.items.push(newImg)
        this.isUploadingImage = false
      })
    },
    // to delete image in fb storage
    deleteImage(url) {
      storage
        .refFromURL(url)
        .delete()
        .then(() => {
          const newImg = { src: url }
          const index = this.items.indexOf(newImg)
          this.items.splice(index, 1)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Error deleting image', error)
        })
    },

    // final function which will store product in the rtdb
    addProduct() {
      db.ref('adminUserName/products/' + this.form.productModelNo)
        .set({
          name: this.form.productName,
          category: this.form.productCatogory,
          type: this.form.productType,
          company: this.form.productCompanyName,
          price: this.form.productPrice,
          discription: this.form.productDiscription,
          modelNo: this.form.productModelNo,
          imgUrls: this.items,
        })
        .then((result) => {
          // eslint-disable-next-line no-console
          console.log(result)
          // eslint-disable-next-line no-console
          console.log('success from rtdb save data')
          this.$router.push('/admin/productList')
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err.response.data)
          // eslint-disable-next-line no-console
          console.log('failur from rtdb save data')
        })
    },
  },
}
</script>

<style></style>
