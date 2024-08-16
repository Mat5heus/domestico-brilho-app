<template>
  <ion-page>
    <Toolbar/>
      <ion-content >
        <products-grid sectionName="Resultado da busca:" :products="showFoundProductsGrid.list" v-if="showFoundProductsGrid !== undefined && route.query.q != ''" />
        <products-grid sectionName="Você também pode gostar:" :products="products.list"/>
      </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { useDbCall } from '~/composables/api/useDb';
import { findProducts, getProductsList } from '~/composables/state/useState';
import { useRoute } from 'vue-router';
import type { Reactive } from 'vue';

const route = useRoute()
const call = useDbCall()

const products = await getProductsList(
  call.getCollection(),
  call.getLimitValue()
)

let showFoundProductsGrid;

if ('query' in route && 'q' in route.query) {
  const query: string = route.query.q as string
  showFoundProductsGrid = await findProducts(
    call.getCollection(),
    call.getField().name,
    '>=',
    capitalize(
      query.toLocaleLowerCase()
    )
  )
}

</script>