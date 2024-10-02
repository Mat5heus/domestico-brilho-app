<template>
  <ion-header>
    <ion-toolbar color="secondary" class="custom-Toolbar">
      <div class="toolbar-container">
        <ion-searchbar
          color="primary"
          :placeholder="$t('Projector, Shaver, Light ring, Electric cleaning brush...')" 
          :clear-input="true"
          fill="outline"
          class="SearchBar"
          @ion-change="handleInput($event)"/>
      </div>
      <ion-buttons slot="end">
        <ion-button @click="openNotificationsModal" size="large" color="secondary" class="buttons-from-toolbar">
          <ion-icon    color="dark" :icon="ioniconsNotificationsOutline"/>
          <ion-badge v-if="numberOfNotifications > 0" color="danger">{{ numberOfNotifications }}</ion-badge>
        </ion-button>
        <ion-button @click="openHelpModal" size="large" color="secondary" class="buttons-from-toolbar">
          <ion-icon    color="dark" :icon="ioniconsHelpCircleOutline"/>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import type { SearchbarChangeEventDetail } from '@ionic/vue';
import { openHelpModal, openNotificationsModal } from '~/utils/open-modal';
import { useIonRouter } from '@ionic/vue';
import key from '~/utils/key';
import { getAnalytics, logEvent } from "firebase/analytics";

const route = useIonRouter()
const numberOfNotifications = ref(0 as number)

const { locale } = useI18n()
const localePath = (path: string) => {
    if(locale.value == "pt") {
        return path
    }
    return `/${locale.value}${path}`;
}

async function handleInput(event: IonSearchBarCustomEvent<SearchbarChangeEventDetail>): Promise<void>{
  const query: string = event.target.value

  const analytics = getAnalytics();
  logEvent(analytics, 'search', {
    search_term: query
  })
  
  route.push(localePath("/tabs/search?q="+query))
}

async function getNumberOfPushNotification() {
    const retrivedList: string | undefined | null = await key.getKey('notificationList')
    try {
        if (retrivedList) {
            const parsedList = JSON.parse(retrivedList)
            if (Array.isArray(parsedList) && parsedList.length > 0) {
                numberOfNotifications.value = parsedList.length
            }
        }
    } catch(e) {
        console.log("Não foi possível obter o número de notificações: "+e)
    }
}
getNumberOfPushNotification()

window.addEventListener("NewPushNotification", getNumberOfPushNotification)
</script>
<style>
.toolbar-container {
  
}
</style>

<style scoped>
  /* Scoped components require higher specificity to customize */
  /* Este estilo CSS deve ser utilizado aqui mesmo, não transferir para outro documento */
  ion-searchbar.SearchBar {
    --color: #000000;
    --placeholder-color: #626262;
    --icon-color: var(--icon-color-dark);
    --clear-button-color: #000000;
    --border-radius: 10px;
    --box-shadow: 0px;
  
  }
ion-toolbar {
  --padding-start: 0;
  --padding-end: 0;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
}

ion-searchbar.ios.custom {
  --cancel-button-color: var(--icon-color-primary);
}

ion-searchbar.md.custom {
  --cancel-button-color: var(--icon-color-primary);
}

.buttons-from-toolbar, ion-button {
  --box-shadow: none !important;
}
</style>

