import * as firebase from 'firebase/app'
import 'firebase/messaging'

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
})

if ('serviceWorker' in navigator) {
  try {
    navigator.serviceWorker
      .register('./service-worker.ts')
      .then(registration => {
        firebase.messaging().usePublicVapidKey(process.env.PUBLIC_VAPID_KEY)

        // Make Firebase Messaging use our custom service worker
        firebase.messaging().useServiceWorker(registration)

        firebase
          .messaging()
          .requestPermission()
          .then(() => {
            firebase
              .messaging()
              .getToken()
              .then(token => {
                alert('FCM token: ' + token)
              })

            firebase.messaging().onMessage(payload => {
              console.log(payload)
            })
          })
      })
  } catch (error) {
    console.error(error)
  }
}
