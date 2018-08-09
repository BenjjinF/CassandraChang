import * as firebase from 'firebase/app'
import 'firebase/firestore'
import credentials from '../credentials.js'

if (!firebase.apps.length) {
  const config = credentials.firebase
  firebase.initializeApp(config)
}

export const firestore = firebase.firestore()
export default firebase
