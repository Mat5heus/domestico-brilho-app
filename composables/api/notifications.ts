import { PushNotifications } from '@capacitor/push-notifications';
import type { ActionPerformed, PushNotificationSchema, RegistrationError, Token } from '@capacitor/push-notifications';
import { getAnalytics, logEvent } from "firebase/analytics";
import key from '~/utils/key';
import { capitalize } from 'vue';

const notificationsListener = reactive({
  registration: null as null | Token,
  registrationError: null as null | RegistrationError,
  pushNotificationReceived: null as null | PushNotificationSchema,
  pushNotificationActionPerformed: null as null | ActionPerformed
})

//const notificationList = []

const waitForPushNotifications = async () => {
  await PushNotifications.addListener('registration', token => {
    notificationsListener.registration = token
  });

  await PushNotifications.addListener('registrationError', err => {
    console.error('Registration error: ', err.error);
  });

  await PushNotifications.addListener('pushNotificationReceived', async notification => {

    notification.data.read = false
    notification.data.date = setTime()

    const jsonNotification = await key.getKey('notificationList')
    let notificationList: PushNotificationSchema[] = []
    if(jsonNotification) {
      const jsonToObj = JSON.parse(jsonNotification)
      if(jsonToObj) {
        notificationList = jsonToObj
      }
    }
    notificationList.push(notification)
    await key.setKey('notificationList', JSON.stringify(notificationList))
    window.dispatchEvent(new Event("NewPushNotification"))

    const analytics = getAnalytics();
    logEvent(analytics, 'notification_received');
  })

  await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
    console.log('Push notification action performed', notification.actionId, notification.inputValue);
  })
}

function setTime() {
  const now = new Date()
  let formatedDate: string = capitalize(now.toLocaleDateString('pt-BR', { weekday: 'short'}))

  formatedDate += " "
  if(now.getHours() < 10) {
      formatedDate += `0${now.getHours()}`
  } else {
      formatedDate += now.getHours()
  }
  formatedDate += ":"
  if(now.getMinutes() < 10) {
      formatedDate += `0${now.getMinutes()}`
  } else {
      formatedDate += now.getMinutes()
  }
  return formatedDate
}

const getUserPermission = async () => {
  let permStatus = await PushNotifications.checkPermissions()

  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions()
  }

  if (permStatus.receive !== 'granted') {
    throw new Error('User denied permissions!')
  }

  await PushNotifications.register()
}

const getDeliveredNotifications = async () => {
  const notificationList = await PushNotifications.getDeliveredNotifications();
  console.log('delivered notifications', notificationList.notifications);
  return notificationList
}

const enableNotifications = async() => {
  await getUserPermission()
}

export default {
  waitForPushNotifications,
  getUserPermission,
  getDeliveredNotifications,
  enableNotifications,
  notificationsListener
}