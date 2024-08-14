<template>
  <ion-header>
  <ion-toolbar color="secondary">
    <ion-title>{{ title }}</ion-title>
    <ion-buttons slot="end">
      <ion-button @click="close">
        <ion-text>Fechar</ion-text>
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
</template>

<script lang="ts" setup>
import { closeModal } from '~/utils/open-modal.js';
import { Product } from '~/models/Product';

const close = closeModal()
const undef = useAttrs().name as string | Product[]

let title: string = ''

if(Array.isArray(undef)) {
const product: Product = undef[undef.length - 1] as Product
title = product?.getName() as string
} else {
title = undef as string
}
</script>
