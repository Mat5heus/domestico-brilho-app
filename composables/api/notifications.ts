import { PushNotifications } from '@capacitor/push-notifications';
import type { ActionPerformed, PushNotificationSchema, RegistrationError, Token } from '@capacitor/push-notifications';
import key from '~/utils/key';

const notificationsListener = reactive({
  registration: null as null | Token,
  registrationError: null as null | RegistrationError,
  pushNotificationReceived: null as null | PushNotificationSchema,
  pushNotificationActionPerformed: null as null | ActionPerformed
})

const notificationList: PushNotificationSchema[] = []

const waitForPushNotifications = async () => {
  await PushNotifications.addListener('registration', token => {
    notificationsListener.registration = token
  });

  await PushNotifications.addListener('registrationError', err => {
    console.error('Registration error: ', err.error);
  });

  await PushNotifications.addListener('pushNotificationReceived', async notification => {
    console.log('Push notification received: ', notification);
    notificationList.push(notification)
    await key.setKey('notificationList', JSON.stringify(notificationList))
  });

  await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
    console.log('Push notification action performed', notification.actionId, notification.inputValue);
  });
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

const showNotificationPreVisualRequest = () => {
  const alertComponent = {
    header: "Não perca as novidades!",
    message: "Ative as notificações para não perder nenhum novo achadinho" ,
    buttons: [
      {
        text: "Não",
        role: "cancel",
        handler: () => console.log("Ativar notificações depois"),
        cssClass: 'alert-button-cancel',
      },
      {
        text: "Ativar agora",
        role: "confirm",
        handler: async () => await enableNotifications(),
        cssClass: 'alert-button-confirm',
      },
    ],
  }
  createAlert(alertComponent)
}

const enableNotifications = async() => {
  await getUserPermission()
}

export default {
  waitForPushNotifications,
  getUserPermission,
  getDeliveredNotifications,
  enableNotifications,
  showNotificationPreVisualRequest,
  notificationsListener
}