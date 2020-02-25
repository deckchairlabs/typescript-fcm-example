declare var self: ServiceWorkerGlobalScope
import { firebaseConfig } from './config'
import firebaseMessaging from './serviceWorker/firebaseMessaging'

self.importScripts('https://www.gstatic.com/firebasejs/7.9.0/firebase-app.js')
self.importScripts(
  'https://www.gstatic.com/firebasejs/7.9.0/firebase-messaging.js'
)

const firebaseApp = firebase.initializeApp(firebaseConfig)
firebaseMessaging(firebaseApp)
