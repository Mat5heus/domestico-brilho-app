<template>
  <ion-page color="primary">
    <toolbar/>
    <ion-content overflow-scroll="true">
      <div>
        <img loading="lazy" :src="banner"/>
      </div>
      <product-slide :section_name="$t('title')" :products="weekProducts?.list" :key="weekProducts?.list"/>
      <Lazyproducts-grid sectionName="Você também pode gostar:" :products="randomProducts?.list" :key="randomProducts?.list"/>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import banner from '~/public/welcome-banner.gif'
import { useDbCall } from '~/composables/api/useDb';
import { getAllProductsAction } from '~/services/actions/product-action';
import { useCheckForUpdates } from '~/composables/state/useCookie';
import { Product } from '~/models/Product';

useCheckForUpdates()

definePageMeta({ alias: ['/'] })

const call = useDbCall()
const weekProducts = reactive({ list: [] as Product[] })
const randomProducts = reactive({ list: [] as Product [] })

try {
  Promise.all([
    getAllProductsAction(
      call.getCollection(), 
      call.getLimitValue(),
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
  })
} catch (e) {
  console.log("Não foi possível encontrar os achadinhos: s"+e)
}

</script>



