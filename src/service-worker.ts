import firebaseConfig from './firebase.config'

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

firebase.initializeApp(firebaseConfig)

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
