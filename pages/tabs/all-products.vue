<template>
    <ion-page>
      <Toolbar/>
        <ion-content >
          <products-grid :products="products.list"/>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { useDbCall } from '~/composables/api/useDb';
import { getProductsList } from '~/composables/state/useState';

const call = useDbCall()

const products = await getProductsList(
  call.getCollection(),
  call.getLimitValue()
)

</script>