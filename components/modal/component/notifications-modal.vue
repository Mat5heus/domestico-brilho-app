<template>
    <modal-head :name='$t("Notifications")'/>
    <ion-content>
        <ion-list v-if="notificationMonitor.thereIsAnyNotification" >
            <ion-item button 
                @click="openProductPage(notification.data)" 
                :color="notification.data?.read ? 'primary' : 'warning'" 
                v-for="notification in notificationMonitor.notificationList" 
                :key="notificationMonitor.notificationList"
            >
                <ion-avatar aria-hidden="true" slot="start">
                    <img v-if="!notification.data?.imageLink" :src="imageIcon"></img>
                    <img v-else loading="lazy" :src="notification.data?.imageLink" :alt="notification.title">
                </ion-avatar>
                <ion-label class="notification-label">
                    <div class="notification-text-container">
                        <h3><ion-text style="font-weight: bold; font-size: large;">{{ notification.title }}</ion-text></h3>
                        <p><ion-text style="font-weight: normal; font-size: medium;">{{ notification.body }}</ion-text></p>
                    </div>
                    <div class="notification-time-container">
                        <p><ion-text style="font-weight: bold;">
                            {{ notification.data.date }}
                        </ion-text></p>
                    </div>
                </ion-label>
            </ion-item>
        </ion-list>
        <ion-text v-else style="display: flex; justify-content: center; align-items: center; height: 100%;">
            <h3 style="text-align: center; font-weight: normal;">{{ $t("There are no notifications yet!") }}</h3>
        </ion-text>
    </ion-content>
</template>
<script lang="ts" setup>
import imageIcon from "~/assets/images/image-icon.svg"
import type { PushNotificationSchema } from '@capacitor/push-notifications';
import key from '~/utils/key';
import { closeModal } from '~/utils/open-modal';
import { useIonRouter } from '@ionic/vue';
import { onIonViewDidEnter } from "#imports";
import { getAnalytics, logEvent } from "firebase/analytics";

onIonViewDidEnter(() => {
  const analytics = getAnalytics();
  logEvent(analytics, 'screen_view', {
    firebase_screen: 'Página de notificações', 
    firebase_screen_class: 'notification_modal'
  });
})

const notificationMonitor = reactive({
    notificationList: [] as PushNotificationSchema[],
    thereIsAnyNotification: false as boolean
})

async function getPushNotificationList() {
    const retrivedList: string | undefined | null = await key.getKey('notificationList')
    try {
        if (retrivedList) {
            const parsedList = JSON.parse(retrivedList)
            if (Array.isArray(parsedList) && parsedList.length > 0) {
                notificationMonitor.notificationList = parsedList
                notificationMonitor.notificationList.reverse()
                notificationMonitor.thereIsAnyNotification = true
            }
        } else {
            notificationMonitor.thereIsAnyNotification = false
        }
    } catch(e) {
        console.log("Valor retornado da key não corresponde ao esperado: "+e)
    }
}
getPushNotificationList()

window.addEventListener("NewPushNotification", getPushNotificationList)

const router = useIonRouter()
const { locale } = useI18n()

const openProductPage = (data: any): void => {
    changeNotificationStatus(data)
    router.push({
        path: localePath(`/product/${data.id}`),
        query: {
            utm_source: "notification",
            utm_medium: "notificationModal"
        }
    })
    const close = closeModal()
    close()
}

const changeNotificationStatus = (data: object) => {
    const notificationList = notificationMonitor.notificationList
    notificationList.find((notification: any) => {
        if(notification.data.id == data.id) {
            notification.data.read = true
        }
    })
    const stringifiedList = JSON.stringify(notificationList.reverse())
    key.setKey('notificationList', stringifiedList)
}

const localePath = (path: string) => {
    if(locale.value == "pt") {
        return path
    }
    return `/${locale.value}${path}`;
}

</script>
<style scoped>
.notification-label {
    display: flex;
    flex-direction: grid;
    justify-content: space-between;
    height: 100%; /* Para garantir que o conteúdo ocupe o espaço total */
}
.notification-time-container {
    display: flex;
    justify-content:center; /* Centraliza horizontalmente, se necessário */
    align-items: center; /* Centraliza verticalmente */
    height: 100%;
}
.notification-text-container {
    margin: auto;
}

ion-avatar {
    --border-radius: 4px;
}
</style>
