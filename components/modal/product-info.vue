<template>
  <modal-head :name="products.list" />
  <ion-content>
    <info-description :description="products.list" />
  </ion-content>
  <ion-footer class="call-to-action-footer">
    <call-to-action :links="products.list"/>
  </ion-footer>
</template>

<script lang="ts" setup>
import { getKey } from '~/utils/key';
import { findProducts } from '~/composables/state/useState';
import { useDbCall } from '~/composables/api/useDb';
import type { Reactive } from 'vue';
import type { Product } from '~/models/Product';

const call = useDbCall()

const products: Reactive<{ list: Product[] }> = await findProducts(
  call.getCollection(),
  call.getField().id,
  "==",
  Number(await getKey("cod"))
)

</script>

<style >
ion-action-sheet {
  --button-color: blue;
}

#open-action-sheet {
  --box-shadow:0px;
}

ion-toast, #title, .description-title, #figcaption {
  text-align: center;
}

.description-title, #figcation {
  font-size: medium; 
  color: gray; 
  font-style: oblique;
}
#description {
  text-align: center;
}
#figcaption {
  font-size: smaller;
}
.call-to-action-footer {
  background-color: var(--ion-color-secondary);
}
</style>
