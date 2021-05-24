<template>
  <v-app>
    <!-- simple vutify card as body of login card -->
    <v-card class="mx-auto mt-12 mb-12" max-width="500" elevation="24">
      <v-card-title class="justify-center blue--text">
        Welcome to Blue!!!!
      </v-card-title>

      <v-card-subtitle class="text-center blue--text">
        Please Login to continue
      </v-card-subtitle>
      <!-- alert for wrong password and email -->
      <v-alert
        dense
        outlined
        type="error"
        max-width="400"
        class="ma-auto"
        :value="alert"
      >
        Please Check <strong>User Email</strong> or/and
        <strong>Password</strong> are <strong>Invalid</strong>
      </v-alert>
      <v-card-text class="text-center">
        <v-form ref="form" @submit.prevent="login">
          <v-container fluid>
            <v-row class="justify-center">
              <v-col cols="10">
                <v-text-field
                  v-model="form.userEmail"
                  :rules="[rules.name, rules.email]"
                  color="primary"
                  label="User Email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="10">
                <v-text-field
                  v-model="form.userPass"
                  color="primary"
                  label="Password"
                  required
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.name, rules.min]"
                  :type="show ? 'text' : 'password'"
                  name="password"
                  hint="At least 8 characters"
                  counter
                  @click:append="show = !show"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-btn :disabled="!formIsValid" color="primary" type="submit" block>
              Login
            </v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn
              text
              color="primary"
              type="submit"
              href="/auth/register"
              block
            >
              Register
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import { db } from '../../plugins/firebase'
export default {
  middleware: 'guest',
  data() {
    const defaultForm = Object.freeze({
      userEmail: '',
      userPass: '',
    })

    return {
      form: Object.assign({}, defaultForm),
      rules: {
        min: (v) => v.length >= 8 || 'Min 8 characters',
        name: (val) => (val || '').length > 0 || 'This field is required',
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },

      alert: false, // to triger alert
      show: false, // for password field

      defaultForm,
    }
  },

  computed: {
    formIsValid() {
      return this.form.userEmail && this.form.userPass
    },
  },

  methods: {
    // to login in fb
    login() {
      // this.$axios
      //   .$post(
      //     `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_KEY}`,
      //     { email: this.form.userEmail, password: this.form.userPass }
      //   )
      //   .then((res) => {
      //     // eslint-disable-next-line no-console
      //     console.log(res)
      //     this.$cookies.set('token', res.idToken)
      //     this.$router.push('/')
      //   })
      //   .catch(() => {
      //     this.alert = true
      //     setTimeout(() => {
      //       this.alert = false
      //     }, 5000)
      //   })
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.userEmail, this.form.userPass)
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log(res)
          this.$cookies.set('uid', res.user.uid)
          this.$cookies.set('logedIn', true)
          this.$store.commit('auth/setLogedIn', true)
          this.$store.commit('cart/setUid', res.user.uid)
          db.ref(`users/${res.user.uid}/cartProduct`).on(
            'value',
            (snapshot) => {
              const data = snapshot.val()
              if (data) {
                // eslint-disable-next-line no-console
                console.log(data)
                const products = Object.keys(data).map((i) => data[i])
                this.$store.commit('cart/setCartCount', products.length)
                this.$cookies.set('cartCount', products.length)
                // eslint-disable-next-line no-console
                console.log(products)
              } else {
                this.$store.commit('cart/setCartCount', null)
                this.$cookies.set('cartCount', null)
              }
            }
          )
          this.$router.push('/')
        })
        .catch(() => {
          this.alert = true
          setTimeout(() => {
            this.alert = false
          }, 5000)
        })
    },
  },
}
</script>
