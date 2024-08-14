<template>
  <ion-header>
    <ion-toolbar color="secondary" class="custom-Toolbar">
      <ion-grid>
        <ion-row>
          <ion-col size="9">
            <ion-searchbar
              color="primary"
              placeholder="Projetor, Barbeador, Light ring, Escova de limpeza elétrica..." 
              :clear-input="true"
              fill="outline"
              class="SearchBar"
              @ion-change="handleInput($event)"
              />
          </ion-col>
          <ion-col size="3">
            <ion-buttons>
              <ion-button @click="openNotificationsModal" size="large">
                <ion-icon slot="icon-only" color="dark" :icon="ioniconsNotificationsOutline"/>
                <ion-badge color="danger"></ion-badge>
              </ion-button>
              <ion-button @click="openHelpModal" size="large">
                <ion-icon slot="icon-only" color="dark" :icon="ioniconsHelpCircleOutline"/>
              </ion-button>
            </ion-buttons>
          </ion-col>
        </ion-row>
      </ion-grid>

    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import { type SearchbarChangeEventDetail } from '@ionic/vue';
import { openHelpModal, openNotificationsModal } from '~/utils/open-modal';

function handleInput(event: IonSearchBarCustomEvent<SearchbarChangeEventDetail>): Promise<void>{
  const query: string = event.target.value
  openFoundProductsModal(
    capitalize(
      query.toLocaleLowerCase()
    )
  )
}

</script>

<style scoped>
  /* Scoped components require higher specificity to customize */
  /* Este estilo CSS deve ser utilizado aqui mesmo, não transferir para outro documento */
  ion-searchbar.SearchBar {
    --color: #000000;
    --placeholder-color: #626262;
    --icon-color: #03254B;
    --clear-button-color: #000000;
    --border-radius: 10px;
    --box-shadow: 0px;
    
  }

  ion-searchbar.ios.custom {
    --cancel-button-color: #19422d;
  }

  ion-searchbar.md.custom {
    --cancel-button-color: #fff;
  }
</style>

