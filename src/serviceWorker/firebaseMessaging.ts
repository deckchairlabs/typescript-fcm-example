declare var self: ServiceWorkerGlobalScope

interface MessagePayload {
  notification: {
    title: string
    body: string
  }
}

interface FirebaseMessagingOptions {}

export default (
  firebase: firebase.app.App,
  options?: FirebaseMessagingOptions
) => {
  firebase
    .messaging()
    .setBackgroundMessageHandler((message: MessagePayload) => {
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
}
