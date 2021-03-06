import * as firebase from 'firebase/app'
import 'firebase/messaging'
import { firebaseConfig } from './config'

firebase.initializeApp(firebaseConfig)

const textarea = document.getElementById('token') as HTMLTextAreaElement

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
                console.log('FCM token: %s', token)
                if (textarea) {
                  textarea.value = token
                }
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
