declare var self: ServiceWorkerGlobalScope

interface MessagePayload {
  notification: {
    title: string
    body: string
  }
}

self.importScripts('https://www.gstatic.com/firebasejs/7.9.0/firebase-app.js')
self.importScripts(
  'https://www.gstatic.com/firebasejs/7.9.0/firebase-messaging.js'
)

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

firebase.messaging().setBackgroundMessageHandler((message: MessagePayload) => {
  const notificationTitle: string = message.notification.title
  const notificationOptions: NotificationOptions = {
    body: message.notification.body,
    requireInteraction: true,
    actions: [
      {
        action: 'testing',
        title: 'Test Action'
      }
    ]
  }

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
})

self.addEventListener('notificationclick', event => {
  event.notification.close()
  console.log(event)
})

self.addEventListener('notificationclose', event => {
  console.log(event)
})

export default null
