<template>
  <ion-page color="primary">
    <toolbar/>
    <ion-content overflow-scroll="true">
      <div>
        <img loading="lazy" :src="banner"/>
      </div>
      <product-slide :section_name="$t('title')" :products="weekProducts.list" :key="weekProducts.list"/>
      <Lazyproducts-grid sectionName="Você também pode gostar:" :products="randomProducts.list" :key="randomProducts.list"/>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import banner from '~/public/welcome-banner.gif'
import { useDbCall } from '~/composables/api/useDb';
import { getAllProductsAction } from '~/services/actions/product-action';
import { useCheckForUpdates } from '~/composables/state/useCookie';
import { Product } from '~/models/Product';
import { PushNotifications } from '@capacitor/push-notifications';
import notifications from '~/composables/api/notifications';
import { SplashScreen } from '@capacitor/splash-screen';

definePageMeta({ alias: ['/'] })
const call = useDbCall()
const weekProducts = reactive({ list: [] as Product[] })
const randomProducts = reactive({ list: [] as Product [] })

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
    
    SplashScreen.hide()
  })
} catch (e) {
  console.log("Não foi possivel obter esta informação: "+e)
}

onMounted(async () => {
  useCheckForUpdates()

  try{
    Promise.all([
      PushNotifications.checkPermissions(),
      notifications.waitForPushNotifications()
    ]).then(([userPermissions]) => {
      if(userPermissions.receive === 'prompt')
          notifications.showNotificationPreVisualRequest()
    }).catch((error) => {
      console.log("Notificações push não estão implementadas no modo WEB")
    })
  } catch (error) {
    console.log("Notificações push não estão implementadas no modo WEB")
  }
  
})

</script>



