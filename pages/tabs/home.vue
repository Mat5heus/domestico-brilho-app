<template>
  <ion-page color="primary">
    <toolbar/>
    <ion-content overflow-scroll="true">
      <div>
        <img :src="banner"/>
      </div>
      <slide-component :section_name="$t('title')" :list="weekProducts.list"/>
      <products-grid :products="randomProducts.list"/>      
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import banner from '~/public/welcome-banner.gif'
import { getProductsList } from '~/composables/state/useState';
import { useDbCall } from '~/composables/api/useDb';

definePageMeta({ alias: ['/'] })

const call = useDbCall()

const weekProducts = await getProductsList(
  call.getCollection(), 
  call.getLimitValue(),
  call.getOrderByField(), 
  call.getOrderByDirection()
)

const randomProducts = await getProductsList(
  call.getCollection(), 
  call.getLimitValue()
)

</script>



