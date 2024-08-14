<template>
  <ion-header>
  <ion-toolbar color="secondary">
    <ion-buttons slot="start">
      <ion-back-button text="" :icon="ioniconsArrowBackOutline"></ion-back-button>
    </ion-buttons>
    <ion-title>{{ title }}</ion-title>
  </ion-toolbar>
</ion-header>
</template>

<script lang="ts" setup>
const title: string = useAttrs().name as string
</script>