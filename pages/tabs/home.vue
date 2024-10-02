<template>
  <ion-page color="primary">
    <toolbar/>
    <ion-progress-bar v-if="loading" type="indeterminate"/>
    <ion-content overflow-scroll="true">
      <div style="text-align: center;">
        <img loading="lazy" :src="welcomeBanner"/>
      </div>
      <product-slide 
        :sectionName="t('Weekly Finds')"
        :products="weekProducts.list" 
        :key="weekProducts.list" 
        :routeInfo="{ 
          component: 'WeeklyFinds',
          location: 'Home'
        }
      "/>
      <Lazyproducts-grid 
        :sectionName="t('You might also like')"
        :products="randomProducts.list" 
        :key="randomProducts.list" 
        :routeInfo="{ 
          component: 'YouMayLike',
          location: 'Home'
        }
      "/>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import key from '~/utils/key'
import welcomeBanner from '~/assets/images/welcome-banner.gif'
import { onIonViewDidEnter, useI18n, useNuxtApp } from '#imports';
import { useDbCall } from '~/composables/api/useDb';
import { getAllProductsAction } from '~/services/actions/product-action';
import { useCheckForUpdates } from '~/composables/state/useCookie';
import { Product } from '~/models/Product';
import { PushNotifications } from '@capacitor/push-notifications';
import notifications from '~/composables/api/notifications';
import { SplashScreen } from '@capacitor/splash-screen';
import { onBeforeMount, onMounted } from 'vue';
import { createAlert } from "~/utils/alertComponent"
import { getAnalytics, logEvent } from "firebase/analytics";

onIonViewDidEnter(() => {
  const analytics = getAnalytics();
  logEvent(analytics, 'screen_view', {
    firebase_screen: "Página Inicial", 
    firebase_screen_class: 'home'
  })
})

const loading = ref(true as boolean)

definePageMeta({ 
  alias: ['/'],
})

const call = useDbCall()
const weekProducts = reactive({ list: [] as Product[] })
const randomProducts = reactive({ list: [] as Product [] })

function changeLoadingStatus(isLoading: boolean) {
  loading.value = isLoading
}

try {
  Promise.all([
    getAllProductsAction(
      call.getCollection(), 
      10,
      call.getField().date, 
      call.getOrderByDirection()
    ),
    getAllProductsAction(
      call.getCollection(), 
      call.getLimitValue()
    )
  ]).then(([ weekProductsData, randomProductsData ] ) => {
    weekProducts.list = weekProductsData
    randomProducts.list = randomProductsData
    changeLoadingStatus(false)
    SplashScreen.hide()
  })
} catch (e) {
  console.log("Não foi possivel obter esta informação: "+e)
}

const { t } = useI18n()

onBeforeMount(async () => {
  const getLanguage = await key.getKey("UserLanguage")
  if(getLanguage) {
    useI18n().setLocale(getLanguage)
  } else {
    console.log("User language not found")
  }
})

onMounted(async () => {
  const alertComponent = {
    header: t("Update available!"),
    message: t("A new version of the app is available, would you like to update now?"),
    buttons: [
      {
        text: t("No"),
        role: "cancel",
        cssClass: 'alert-button-cancel',
      },
      {
        text: t("Update"),
        role: "confirm",
        handler: null,
        cssClass: 'alert-button-confirm',
      },
    ],
  }
  useCheckForUpdates(alertComponent)

  try{
    Promise.all([
      PushNotifications.checkPermissions(),
      notifications.waitForPushNotifications()
    ]).then(([userPermissions]) => {
      if(userPermissions.receive === 'prompt')
        createAlert({
          header: t("Don't miss the news!"),
          message: t("Turn on notifications so you don't miss any new finds."),
          buttons: [
            {
              text: t("No"),
              role: "cancel",
              handler: null,
              cssClass: 'alert-button-cancel',
            },
            {
              text: t("Enable now"),
              role: "confirm",
              handler: async () => await notifications.enableNotifications(),
              cssClass: 'alert-button-confirm',
            },
          ],
        })
    }).catch((error) => {
      console.log("Notificações push não estão implementadas no modo WEB")
    })
  } catch (error) {
    console.log("Notificações push não estão implementadas no modo WEB")
  }
})

</script>



