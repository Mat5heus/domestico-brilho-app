<template>
    <modal-head name="Notificações"/>
    <ion-content>
        <ion-list>
            <ion-item button color="primary" v-for="notification in notificationMonitor.notificationList" :key="notificationMonitor.notificationList">
                <ion-avatar aria-hidden="true" slot="start">
                    <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                </ion-avatar>
                <ion-label>
                    <h3>{{ notification.title }}</h3>
                    <p>{{ notification.body }}</p>
                </ion-label>
            </ion-item>
        </ion-list>
    </ion-content>
</template>
<script lang="ts" setup>
import type { PushNotificationSchema } from '@capacitor/push-notifications';
import key from '~/utils/key';

const notificationMonitor = reactive({
    notificationList: [] as PushNotificationSchema[]
})

const retrivedList: string | undefined = await key.getKey('notificationList')
if(retrivedList !== undefined)
    notificationMonitor.notificationList = JSON.parse(retrivedList)

</script>