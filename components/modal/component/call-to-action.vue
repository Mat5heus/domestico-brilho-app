<template>    
    <ion-button size="large" class="product-page-buttons" @click="onShare()">
        <ion-icon slot="icon-only" :icon="ioniconsShareSocialOutline" size="large"/>
    </ion-button>
    <ion-button id="open-action-sheet" class="product-page-buttons" color="tertiary" fill="solid">
        <ion-icon color="primary" size="large" :icon="ioniconsBagOutline"></ion-icon>
        <ion-text color="primary" class="space-between-button-and-icon">{{ $t("View in store") }}</ion-text>
    </ion-button>
    <ion-action-sheet trigger="open-action-sheet" :header='$t("Choose the store")' :buttons="actionSheetButtons"/>
</template>
<script lang="ts" setup>
import type { Product } from '~/models/Product'
import { Share } from '@capacitor/share';
import { onIonViewDidEnter, useI18n } from "#imports"
import { createActionSheetButtons } from '~/utils/action-sheets';

const { t } = useI18n()

const likesCounter =  {
    like: ref(0),
    flag: false
}

const buttons = {
    text: {
        aliexpress: t("Buy on AliExpress"),
        shopee: t("Buy on Shopee")
    },
}


const product: Product = useAttrs().links as Product
const actionSheetButtons = createActionSheetButtons(product, buttons)

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
    try { 
        await Share.share(
            {
                title: title,
                text: "Clique aqui agora para ver este achadinho incrivel que eu encontrei: *Produto nº "+product?.getId()+"*. Aproveite e *baixe o App Doméstico Brilho*, para não perder nenhuma novidade!",
                url: "https://sites.google.com/view/domesticobrilho/inicio",
                dialogTitle: "Compartilhe com a família e os amigos!",
            }
        )
    } catch(e) {
        console.log("Share não pôde ser disparado: "+e)
    }
    
}
/*
<ion-button size="large" @click="onLike()">
    <ion-icon slot="icon-only" :icon="ioniconsHeartOutline" size="large"/>
    <ion-text>+{{ likesCounter.like }}</ion-text>
</ion-button>
*/


</script>
<style>
.product-page-buttons {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
}
</style>