<template>
    <ion-page>
        <page-head :name="product?.getName()"/>
        <ion-content>
            <Lazyion-img :src="product?.getImage()" :alt="product?.getName()"/>

            <ion-text>
                <h6 id="info">(Foto e descrição meramente ilustrativas)</h6>
                <br/>
                <h4 id="title">{{ product?.getName() }}</h4>
                <br/>
            </ion-text>
            <ion-grid>
                <ion-row>
                    <ion-col size="12" class="container-align-center">
                        <ion-button fill="solid" class="ion-no-margin" @click="openVideoPage" color="tertiary" v-if="videoUrl !== undefined">
                            <ion-icon :icon="ioniconsFilmOutline" color="primary"/>
                            <ion-text color="primary" class="space-between-button-and-icon">Ver demonstrativo</ion-text>
                        </ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
            <ion-text color="dark">
               
                <h6 class="description-title">Descrição:</h6>
                <p id="description">{{ product?.getDesc() }}</p>
                <br/>
                <p class="description-title">Última atualização: {{ product?.getDate()?.toDate() }}</p>
            </ion-text>

        </ion-content>
        <ion-footer class="call-to-action-footer">
            <call-to-action :links="product"/>
        </ion-footer>
    </ion-page>
</template>
  
<script lang="ts" setup>
import { Browser } from '@capacitor/browser';

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

const videoUrl: string | undefined = product?.getVideoDemo()

const openVideoPage = async () => {
    try {
        if (videoUrl !== undefined) {
            await Browser.open({ url: videoUrl });
        }
    } catch(e) {
        console.log("Browser não pôde ser aberto: "+e)
    }
};

</script>

<style >
ion-action-sheet {
--button-color: blue;
}

#open-action-sheet {
--box-shadow:0px;
}

ion-toast, #title, .description-title, #info {
text-align: center;
}

.description-title, #info {
font-size: medium; 
color: gray; 
font-style: oblique;
}
#description {
text-align: center;
}
#info {
font-size: xx-small;
margin-top: 0.3rem;
}
.call-to-action-footer {
background-color: var(--ion-color-secondary);
}
</style>
  

