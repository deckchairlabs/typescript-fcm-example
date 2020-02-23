import * as firebase from 'firebase/app'
import 'firebase/messaging'
import firebaseConfig from './firebase.config'

firebase.initializeApp(firebaseConfig)

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
