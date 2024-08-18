<template>
    <ion-grid :fixed="true">
        <ion-row>
            <ion-col size="3" hidden>
                <ion-button size="large" @click="onLike()">
                    <ion-icon slot="icon-only" :icon="ioniconsHeartOutline" size="large"/>
                    <ion-text>+{{ likesCounter.like }}</ion-text>
                </ion-button>
            </ion-col>
            <ion-col size="3" >
                <ion-button size="large" @click="onShare()">
                    <ion-icon slot="icon-only" :icon="ioniconsShareOutline" size="large"/>
                </ion-button>
            </ion-col>
            <ion-col size="6" offset="3">
                <ion-button id="open-action-sheet" color="tertiary" fill="solid">
                    <ion-icon color="primary" size="large" :icon="ioniconsBagOutline"></ion-icon>
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

import { Share } from '@capacitor/share';
import { createActionSheetButtons } from '~/utils/action-sheets'

const likesCounter =  {
    like: ref(0),
    flag: false
}

const product: Product = useAttrs().links as Product
const links: Links = product?.getLinks() as Links

const actionSheetButtons: object[] = createActionSheetButtons(links)

if(product?.getLikes() !== undefined) {
    likesCounter.like.value = product?.getLikes() as number
}

const onLike = () => {
    if(!likesCounter.flag) {
        likesCounter.like.value++
        likesCounter.flag = true
    } else {
        likesCounter.like.value--
        likesCounter.flag = false
    }
}

const onShare = async () => {
    const title = product?.getId+" - "+product?.getName()
    await Share.share(
        {
            title: title,
            text: "Clique aqui agora para ver este achadinho incrivel que eu encontrei: *Produto nº "+product?.getId()+"*. Aproveite e *baixe o App Doméstico Brilho*, para não perder nenhuma novidade!",
            url: "https://sites.google.com/view/domesticobrilho/inicio",
            dialogTitle: "Compartilhe com a família e os amigos!",
        }
    )
}


</script>