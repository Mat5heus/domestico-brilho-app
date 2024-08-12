<template>
  <ion-tabs>
    <ion-router-outlet/>
    <ion-tab-bar slot="bottom" color="secondary">

      <ion-tab-button tab="home" href="/tabs/home" >
        <ion-icon :icon="ioniconsHome" color="dark"/>
        <ion-label color="dark">Início</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="all-products" href="/tabs/all-products">
        <ion-icon :icon="ioniconsBag" color="dark"/>
        <ion-label color="dark">Ver tudo</ion-label>
      </ion-tab-button>
      
    </ion-tab-bar>
  </ion-tabs>
</template>


