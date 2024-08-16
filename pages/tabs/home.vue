<template>
  <ion-page color="primary">
    <toolbar/>
    <ion-content overflow-scroll="true">
      <div>
        <img :src="banner"/>
      </div>
      <slide-test :section_name="$t('title')" :products="weekProducts?.list"/>
      <products-grid sectionName="Você também pode gostar:" :products="randomProducts?.list"/> 
      <ion-alert 
        :is-open="warnUserForUpdate" 
        header="Atualização disponivel!" 
        message="Uma nova versão do app está disponível, deseja atualizar agora?" 
        :buttons="alertButtons" 
      ></ion-alert>     
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import banner from '~/public/welcome-banner.gif'
import { getProductsList } from '~/composables/state/useState';
import { useDbCall } from '~/composables/api/useDb';
import { warnUserForUpdate } from '~/composables/state/useCookie';
import { lastVersion } from '~/composables/state/useCookie';

definePageMeta({ alias: ['/'] })

const call = useDbCall()

const weekProducts = await getProductsList(
  call.getCollection(), 
  call.getLimitValue(),
  call.getField().date, 
  call.getOrderByDirection()
)

const randomProducts = await getProductsList(
  call.getCollection(), 
  call.getLimitValue()
)
const alertButtons = getAlertButtons(lastVersion)
</script>



