<template>
  <ion-page>
    <Toolbar/>
      <ion-content >
        <products-grid 
          sectionName="Resultado da busca:" 
          :key="showFoundProductsGrid.list" 
          :products="showFoundProductsGrid.list" 
          v-if="showFoundProductsGrid !== undefined && route.query.q !== undefined" 
        />
        <Lazyproducts-grid sectionName="Você pode ter perdido:" :products="products.list"/>
      </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { useDbCall } from '~/composables/api/useDb';
import { getProductsFromQuery, getProductsFromRoute } from '~/composables/state/useState';
import { useRoute } from 'vue-router';
import { reactive } from 'vue';
import { Product } from '~/models/Product';
import { getAllProductsAction } from '~/services/actions/product-action';

const showFoundProductsGrid = reactive({ list: [] })
const products = reactive({ list: [] })

const route = useRoute()
const call = useDbCall()

products.list = await getAllProductsAction(
  call.getCollection(),
  call.getLimitValue()
)

showFoundProductsGrid.list = await getProductsFromRoute(
  call, 
  route
) as Product[]

watch(
  () => route.query.q,
  async (newQuery) => {
    const searchQuery = Array.isArray(newQuery) ? newQuery.join(',') : (newQuery || '');
    showFoundProductsGrid.list = await getProductsFromQuery(call, searchQuery)
  }
)

</script>