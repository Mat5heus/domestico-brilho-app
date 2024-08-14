<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet/>
      <ion-tab-bar slot="bottom" color="secondary">

        <ion-tab-button tab="home" href="/tabs/home" >
          <ion-icon :icon="ioniconsHomeOutline" color="dark"/>
          <ion-label color="dark">Início</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="search" href="/tabs/search">
          <ion-icon :icon="ioniconsSearchOutline" color="dark"/>
          <ion-label color="dark">Procurar</ion-label>
        </ion-tab-button>
        
      </ion-tab-bar>
      </ion-tabs>
  </ion-page>
</template>


