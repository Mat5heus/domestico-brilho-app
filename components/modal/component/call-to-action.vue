<template>
    <ion-grid :fixed="true">
        <ion-row>
            <ion-col size="3" hidden>
                <ion-button size="large" >
                    <ion-icon slot="icon-only" :icon="ioniconsHeart" size="large"/>
                </ion-button>
            </ion-col>
            <ion-col size="3" hidden>
                <ion-button size="large" hidden>
                    <ion-icon slot="icon-only" :icon="ioniconsShare" @click="share_product"/>
                </ion-button>
            </ion-col>
            <ion-col size="6" offset="6">
                <ion-button id="open-action-sheet" color="tertiary" fill="solid" expand="full" >
                    <ion-text color="primary">Comprar Agora</ion-text>
                </ion-button>
                <ion-action-sheet trigger="open-action-sheet" header="Actions" :buttons="actionSheetButtons"/>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>
<script lang="ts" setup>
import { share_product } from '~/utils/share-product';
import { createActionSheetButtons } from './action-sheet-buttons.vue';

const props = useAttrs()

let actionSheetButtons: any;
try {
  actionSheetButtons = createActionSheetButtons(props.link)
} catch(error) {
  console.error("Action Sheets error: "+error)
}

</script>