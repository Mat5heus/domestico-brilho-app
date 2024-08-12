<template>
    <ion-header>
    <ion-toolbar color="secondary">
      <ion-title>{{ props.name }}</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="close">
          <ion-text>Fechar</ion-text>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts" setup>
import { closeModal } from '~/utils/open-modal';

const props = useAttrs()
const close = closeModal()
</script>