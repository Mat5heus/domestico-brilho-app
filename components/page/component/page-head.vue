<template>
  <ion-header>
        <ion-toolbar color="secondary">
            <ion-buttons slot="start">
                <ion-button @click="goBack">
                  <ion-icon slot="icon-only" :icon="ioniconsArrowBackOutline" size="large"/>
                </ion-button>
            </ion-buttons>
            <ion-title>{{ title }}</ion-title>
        </ion-toolbar>
    </ion-header>
</template>

<script lang="ts" setup>
import { useIonRouter } from '@ionic/vue';
const title: string = useAttrs().name as string

const ionRouter = useIonRouter()
const goBack = () => {
  ionRouter.back()
}
</script>