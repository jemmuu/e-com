<template>
  <!-- total billing amount card design for the cart page && data will be passed down by cart view-->
  <v-card class="mx-auto mt-5" width="900px" outlined style="border: none">
    <v-card-title>
      <v-row>
        <h1>Total</h1>
        <v-spacer></v-spacer>
        <h1>{{ total }} $</h1>
      </v-row>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-actions>
      <v-dialog v-model="dialog" persistent max-width="500">
        <template #activator="{ on, attrs }">
          <v-btn
            class="justify-center ma-auto"
            color="light blue text-h6"
            style="width: 400px"
            v-bind="attrs"
            dark
            rounded
            v-on="total == 0 ? null : on"
            @click="total == 0 ? (snackbar = true) : null"
          >
            Purchase
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <strong>Please Confirm Your Order</strong>
            <v-spacer></v-spacer>
            <v-btn icon
              ><v-icon @click="dialog = false">mdi-close</v-icon></v-btn
            >
          </v-card-title>
          <v-card-text>
            <div class="successlogo"></div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1 larger" @click="purchase()">
              Confirm Purchase
            </v-btn>
            <v-btn color="red white--text" depressed @click="dialog = false">
              Cancle
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
    <!-- alert for purchasing empty cart -->
    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      color="primary"
      outlined
      shaped
    >
      <h2>Please Add Course in Cart to Purchase it</h2>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      dialog: false,
      snackbar: false,
    }
  },
  methods: {
    // TODO: do something about it
    purchase() {
      alert('Items purchased')
    },
  },
}
</script>

<style>
.successlogo {
  min-width: auto;
  min-height: 250px;

  background-size: cover;
  background-image: url('https://encrypted-tbn0.gstatic.com/ages?q=tbn:ANd9GcQvKnZN_9R2GH4ETw6DdOVNAjmefSNDDIJDWHJpIJ4YkYQnNtVqk7J4VZZDMcJam8FveAI&usqp=CAU');
}
</style>
