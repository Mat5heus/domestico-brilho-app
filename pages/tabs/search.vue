<template>
  <ion-page>
    <Toolbar/>
    <ion-progress-bar v-if="loading" type="indeterminate"/>
      <ion-content >
        <products-grid 
          :sectionName='$t("Search Results")'
          :key="showFoundProductsGrid?.list"
          :products="showFoundProductsGrid?.list"
          v-if="showFoundProductsGrid !== undefined && route.query.q !== undefined"
          :routeInfo="{ component: 'Search_Results', location: 'Search'}"
        />
        <products-grid 
          :sectionName='$t("You may have missed")'
          :products="products.list" 
          :key="products?.list"
          :routeInfo="{ 
            component: 'Maybe_You_Didnt_Get_It',
            location: 'Search'
          }"
        />
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
import { onIonViewDidEnter } from '#imports';
import { getAnalytics, logEvent } from 'firebase/analytics';

onIonViewDidEnter(() => {
  const analytics = getAnalytics();
  logEvent(analytics, 'screen_view', {
    firebase_screen: "Pesquisar",
    firebase_screen_class: 'search'
  });
})

const showFoundProductsGrid = reactive({ list: [] as Product[] | void })
const products = reactive({ list: [] as Product[] })
const loading = ref(true as boolean)

const route = useRoute()
const call = useDbCall()

function changeLoadingStatus(isLoading: boolean) {
  loading.value = isLoading
}

try {
  Promise.all([
    getAllProductsAction(
      call.getCollection(),
      call.getLimitValue()
    ),
    getProductsFromRoute(
      call, 
      route
    )

  ]).then(([productsData, foundProductsData]) => {
    products.list = productsData
    showFoundProductsGrid.list = foundProductsData
    changeLoadingStatus(false)
  })
} catch(e) {
  console.log("Não foi possível pegar dados: "+e)
}


watch(
  () => route.query.q,
  async (newQuery) => {
    const searchQuery = Array.isArray(newQuery) ? newQuery.join(',') : (newQuery || '');
    showFoundProductsGrid.list = await getProductsFromQuery(call, searchQuery)
    const analytics = getAnalytics();
    logEvent(analytics, 'search', {
      search_term: searchQuery
    })
  }
)

</script>