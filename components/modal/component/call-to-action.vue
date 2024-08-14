<template>
    <ion-grid :fixed="true">
        <ion-row>
            <ion-col size="3" >
                <ion-button size="large">
                    <ion-icon slot="icon-only" :icon="ioniconsHeartOutline" size="large"/>
                </ion-button>
            </ion-col>
            <ion-col size="3">
                <ion-button size="large">
                    <ion-icon slot="icon-only" :icon="ioniconsShareOutline" @click="share_product(product)" size="large"/>
                </ion-button>
            </ion-col>
            <ion-col size="6">
                <ion-button id="open-action-sheet" color="tertiary" fill="solid" expand="full" >
                    <ion-text color="primary">Comprar Agora</ion-text>
                </ion-button>
                <ion-action-sheet trigger="open-action-sheet" header="Escolha a loja" :buttons="actionSheetButtons"/>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>
<script lang="ts" setup>
import type { Product } from '~/models/Product'
import type { Links } from '~/models/Links'

import { share_product } from '~/utils/share-product'
import { createActionSheetButtons } from '~/utils/action-sheets'

const product: Product = useAttrs().links as Product
const links: Links = product?.getLinks() as Links

const actionSheetButtons: object[] = createActionSheetButtons(links)
</script>