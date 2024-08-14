<template>
    <ion-page>
        <page-head :name="product?.getName()"/>
        <ion-content>
            <ion-img :src="product?.getImage()" :alt="product?.getName()"/>

            <ion-text>
                <h6 id="figcaption">(Foto e descrição meramente ilustrativas)</h6>
            </ion-text>

            <ion-text color="dark">
                <h5 id="title">{{ product?.getName() }}</h5>
                <br>
                <h6 class="description-title">Descrição:</h6>
                <p id="description">{{ product?.getDesc() }}</p>
                <br>
                <p class="description-title">Última atualização: {{ product?.getDate()?.toDate() }}</p>
            </ion-text>

        </ion-content>
        <ion-footer class="call-to-action-footer">
            <call-to-action :links="product"/>
        </ion-footer>
    </ion-page>
</template>
  
<script lang="ts" setup>
import type { Reactive } from 'vue';
import type { Product } from '~/models/Product';

import { findProducts } from '~/composables/state/useState';
import { useDbCall } from '~/composables/api/useDb';
import { useRoute } from 'vue-router';

const route = useRoute()
const call = useDbCall()

const products: Reactive<{ list: Product[] }> = await findProducts(
    call.getCollection(),
    call.getField().id,
    "==",
    Number(route.params.id)
)

const product = products.list?.pop()

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
  

