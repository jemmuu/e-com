import firebase from 'firebase'
import 'firebase/storage'

let app = null

const firebaseConfig = {
  // firebase config, project name on firebase : "e-com"
  apiKey: 'AIzaSyArZ0KEGVDnuSDh0UvcSPgK1kCpBvmbF1s',
  authDomain: 'e-com-9b644.firebaseapp.com',
  databaseURL: 'https://e-com-9b644-default-rtdb.firebaseio.com',
  projectId: 'e-com-9b644',
  storageBucket: 'e-com-9b644.appspot.com',
  messagingSenderId: '558338399360',
  appId: '1:558338399360:web:5745a43f40a020c2271a65',
  measurementId: 'G-C30NRVY299',
}

// initialize fb if not done before
app = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(firebaseConfig)

export const db = app.database()
export const storage = app.storage()
