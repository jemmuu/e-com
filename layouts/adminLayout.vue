<template>
  <v-app>
    <v-app-bar app color="lighter blue">
      <router-link to="/">
        <div class="d-flex align-center">
          <v-img
            alt="Vuetify Logo"
            class="shrink"
            contain
            src="https://flectrahq.com/flectra_website/static/src/img/pages/brand_assets/icon/svg/flectra-icon-blue.svg"
            transition="scale-transition"
            width="40"
          />
        </div>
      </router-link>
      <div class="menuBtn">
        <v-btn
          text
          height="100%"
          href="/"
          color="white"
          style="font-size: larger"
        >
          Dashboard
        </v-btn>
        <v-btn
          text
          height="100%"
          href="/admin/productList"
          color="white"
          style="font-size: larger"
        >
          Product List
        </v-btn>
        <v-btn
          text
          height="100%"
          href="/admin/addProduct"
          color="white"
          style="font-size: larger"
        >
          Add Products
        </v-btn>
        <v-btn
          text
          height="100%"
          color="white"
          href="/team"
          style="font-size: larger"
        >
          Our Team
        </v-btn>
      </div>

      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-btn color="white" dark v-bind="attrs" outlined v-on="on">
            Hello Admin <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title
              ><v-btn v-if="logedIn" plain color="primary" @click="logout">
                LogOut <v-icon> mdi-logout-variant</v-icon>
              </v-btn></v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer padless color="primary">
      <v-card class="flex primary center" flat tile>
        <v-card-title class="center">
          <strong class="subheading center"
            >Get connected with us on social networks!</strong
          >

          <v-btn
            v-for="icon in icons"
            :key="icon.icon"
            class="mx-4"
            dark
            icon
            :href="icon.link"
          >
            <v-icon size="24px">
              {{ icon.icon }}
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="py-2 white--text text-center">
          @Copyright {{ new Date().getFullYear() }} —
          <strong>Jemmu Kakadiya</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
// import { db } from '../plugins/firebase'
export default {
  data() {
    return {
      search: '',
      icons: [
        { icon: 'mdi-facebook', link: 'https://www.facebook.com/udemy/' },
        { icon: 'mdi-twitter', link: 'https://twitter.com/udemy' },
        {
          icon: 'mdi-linkedin',
          link: 'https://www.linkedin.com/company/udemy/',
        },
        { icon: 'mdi-instagram', link: 'https://www.instagram.com/udemy/' },
      ],
      cartCountInIt: null,
    }
  },
  // async fetch() {
  //   const uid = 'ixoneSe7HeUcnxlPYVY51vqoAEx1'
  //   await db.ref(`users/${uid}/cartProduct`).on('value', (snapshot) => {
  //     const data = snapshot.val()
  //     if (data) {
  //       // eslint-disable-next-line no-console
  //       console.log(data)
  //       const products = Object.keys(data).map((i) => data[i])
  //       this.cartCountInIt = products.length
  //     }
  //   })
  //   // eslint-disable-next-line no-console
  //   console.log(this.cartCountInIt)
  // },
  computed: {
    ...mapGetters({
      cartCount: 'cart/getCartCount',
      logedIn: 'auth/getLogedIn',
    }),
  },
  created() {},
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          this.$store.commit('auth/clear')
          this.$store.commit('cart/clear')
          this.$cookies.remove('cartCount')
          this.$cookies.remove('logedIn')
          this.$cookies.remove('uid')
          this.$cookies.remove('admin')
          this.$router.push('/auth/login')
        })
        .catch((error) => {
          // An error happened.
          // eslint-disable-next-line no-console
          console.log(`there is error in signout error: ${error}`)
        })
    },
    searchBox() {
      this.$bus.$emit('search', this.search)
    },
  },
}
</script>

<style scoped>
.menuBtn {
  height: 100%;
}
.center {
  text-align: center;
  justify-content: center;
  color: white;
  width: 100%;
}
</style>
