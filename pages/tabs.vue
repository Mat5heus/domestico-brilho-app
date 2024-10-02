<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet/>
      <ion-tab-bar slot="bottom" color="secondary">

        <ion-tab-button tab="home" @click="openProductInfo('/tabs/home')" >
          <ion-icon :icon="ioniconsHomeOutline" color="dark"/>
          <ion-label color="dark">{{ $t("Home") }}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="search" @click="openProductInfo('/tabs/search')">
          <ion-icon :icon="ioniconsSearchOutline" color="dark"/>
          <ion-label color="dark">{{ $t("Search") }}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profile" @click="openProductInfo('/tabs/profile')">
          <ion-icon :icon="ioniconsPersonOutline" color="dark"/>
          <ion-label color="dark">{{ $t("Profile") }}</ion-label>
        </ion-tab-button>
        
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>
<script setup lang="ts">
import { ioniconsPersonOutline } from '#imports';
import { useIonRouter } from '@ionic/vue';

const { locale } = useI18n()
const router = useIonRouter()

const localePath = (path: string) => {
  if(locale.value == "pt" || !locale.value ) {
      return path
  }
  return `/${locale.value}${path}`
}

const openProductInfo = (path: string): void => {
  router.push({
    path: localePath(path),
  })
}

</script>

