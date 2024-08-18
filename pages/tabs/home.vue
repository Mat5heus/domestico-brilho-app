<template>
  <ion-page color="primary">
    <toolbar/>
    <ion-content overflow-scroll="true">
      <div>
        <img :src="banner"/>
      </div>
      <slide :section_name="$t('title')" :products="weekProducts?.list"/>
      <products-grid sectionName="Você também pode gostar:" :products="randomProducts?.list"/>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import banner from '~/public/welcome-banner.gif'
import { useDbCall } from '~/composables/api/useDb';
import { getAllProductsAction } from '~/services/actions/product-action';
import { useCheckForUpdates } from '~/composables/state/useCookie';

useCheckForUpdates()

definePageMeta({ alias: ['/'] })

const call = useDbCall()

const weekProducts = reactive({ list: [] })
const randomProducts = reactive({ list: [] })

weekProducts.list = await getAllProductsAction(
  call.getCollection(), 
  call.getLimitValue(),
  call.getField().date, 
  call.getOrderByDirection()
)

randomProducts.list = await getAllProductsAction(
  call.getCollection(), 
  call.getLimitValue()
)

</script>



