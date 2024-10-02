<template>
    <modal-head :name='$t("Help")'/>
    <ion-content>
        <ion-text style="display: flex; justify-content: center; align-items: center; height: 100%;">
            <h3 style="text-align: center; font-weight: normal;">{{ $t("Coming Soon!") }}</h3>
        </ion-text>
    </ion-content>
</template>
<script setup lang="ts">
import { onIonViewDidEnter } from "#imports";
import { getAnalytics, logEvent } from "firebase/analytics";

onIonViewDidEnter(() => {
  const analytics = getAnalytics();
  logEvent(analytics, 'screen_view', {
    firebase_screen: "Página de Ajuda", 
    firebase_screen_class: 'help_modal'
  });
})
</script>
