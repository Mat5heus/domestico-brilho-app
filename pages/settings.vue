<template>
    <ion-page class="custom-theme">
        <ion-content>
            <div class="profile-container" id="setting-info-button" hidden="true">
            </div>
            <div class="profile-container">
                <img class="profile-icon" :src="personIcon">
            </div>
          <br>
          <div class="profile-container">
            <ion-text class="profile-name" color="dark">{{ personName == "" ? $t("Your Name") : personName }}</ion-text>
          </div>
          <br/>
          <div class="preferences-form-container">
            <ion-input 
                class="settings-input-form" 
                maxlength="35" 
                :label="$t('Enter your name')" 
                label-placement="floating" 
                fill="outline" 
                :placeholder="$t('Your Name')" 
                v-model="personName"
                @ionBlur="saveName()"
            ></ion-input>
            <ion-select
                size="large" 
                :label='$t("Select your language")'
                :placeholder="getLocaleName(locale, locales)"
                :ok-text="$t('Confirm')"
                :cancel-text="$t('Cancel')"
                @ionChange="changeLanguage($event)">
                <ion-select-option 
                    :value="locale.code"
                    v-for="locale in locales"
                    :key="locale.code">
                {{ locale.name }}
                </ion-select-option>
            </ion-select>
          </div>
        </ion-content>
        <ion-footer class="settings-footer-box">
            <ion-button @click="goBack()" color="secondary" class="settings-footer-buttons">
                <ion-text color="dark" class="settings-button-text">{{ $t("Cancel") }}</ion-text>
            </ion-button>
            <ion-button @click="saveSettings()" color="secondary" class="settings-footer-buttons">
                <ion-text color="dark" class="settings-button-text">{{ $t("Save") }}</ion-text>
            </ion-button>
        </ion-footer>
    </ion-page>
</template>

<script setup lang="ts">
import { onIonViewDidEnter, useIonRouter } from '@ionic/vue';
import personIcon from "~/assets/images/person-icon-adjusted-color512x512.png"
import { useI18n, useSwitchLocalePath } from '#imports';
import key from '~/utils/key.js'
import { getAnalytics, logEvent } from 'firebase/analytics';

const { locale, locales } = useI18n()
const router = useIonRouter()
const switchLocalePath = useSwitchLocalePath()

const getName = await key.getKey("userName")
const personName = getName ? ref(getName) : ref("")

const saveName = () => {
    key.setKey("userName", personName.value)
}

const saveSettings = (): void => {
    key.setKey("UserLanguage", locale.value)
    router.navigate(verifyRoute(), 'forward', 'push')
}

const goBack = () => {
    router.back()
}

const verifyRoute = (): string => {
    let route: string = `/tabs/profile`
    if(locale.value != 'pt') {
        route = `/${locale.value}/tabs/profile`
    }
    return route
}

const changeLanguage = (event) => {
    router.navigate(switchLocalePath(event.detail.value), 'forward','replace')
}

function getLocaleName(locale, locales) {
    const language = locales.find(l => l.code === locale);
    if( language )  {
        return language.name 
    } 
    console.error("Language not found")
    return "Unkwon"
}

onIonViewDidEnter(() => {
  const analytics = getAnalytics();
  logEvent(analytics, 'screen_view', {
    firebase_screen: 'Configurações',
    firebase_screen_class: 'settings'
  })
})

</script>
<style>
#setting-info-button {
    height: 3rem;
}
.settings-footer-box {
    background-color: white;
    display: flex;
    justify-content: space-around;
    height: 5rem;
}
.settings-footer-buttons{
    height: 3rem;
    width: 10rem;
}
.settings-button-text {
    font-weight: bold;
    font-size: medium;
}
</style>
<style scoped>
.settings-input-form {
    text-align: center;
}
label {
    text-align: center;
}
.settings-footer-box {
    box-shadow: none;
}  

ion-select::part(text) {
  color: #3880ff; /* Cor do texto das opções selecionadas */
}

ion-select::part(icon) {
  color: #3880ff; /* Cor do ícone de seta do select */
}

ion-select {
  --color: #3880ff; /* Cor do círculo de seleção */
}
</style>