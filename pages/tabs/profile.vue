<template>
  <ion-page>
      <ion-content>
        <div class="profile-container">
          <ion-button class="profile-setting-button" @click="openSettings" color="primary" >
            <ion-icon size="large" color="dark" :icon="ioniconsSettingsOutline"></ion-icon>
          </ion-button>
        </div>
        <div class="profile-container">
          <img class="profile-icon" :src="personIcon">
        </div>
        <br>
        <div class="profile-container">
          <ion-text class="profile-name" color="dark">{{ personName }}</ion-text>
        </div>
      </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { ioniconsSettingsOutline } from '#imports';
import { onIonViewDidEnter, useIonRouter } from '@ionic/vue';
import { useI18n } from "#imports"
import  key  from '~/utils/key.js'
import { ref } from 'vue'
import personIcon from "~/assets/images/person-icon-adjusted-color512x512.png"
import { getAnalytics, logEvent } from 'firebase/analytics';

const { locale, t } = useI18n()
const router = useIonRouter()

const personName = ref("")
personName.value = t('Your Name')

const localePath = (path: string) => {
  if(locale.value == "pt") {
    return path
  }
  return `/${locale.value}${path}`;
}

const openSettings = (): void => {
  router.push({
    path: localePath(`/settings`),
  })
}

onIonViewDidEnter(async () => {
  async function getUserName(): Promise<void> {
    const userName = await key.getKey("userName")
    if(!userName || userName === 'null') {
      await key.setKey("userName", "")
    } else {
      personName.value = userName
    }
  }
  await getUserName()


  const analytics = getAnalytics();
  logEvent(analytics, 'screen_view', {
    firebase_screen: "Perfil",
    firebase_screen_class: 'profile'
  });

})
</script>

