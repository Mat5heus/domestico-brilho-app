<template>
    <ion-page>
        <page-head :key="product.list?.getName()" :name="product.list?.getName()"/>
        <ion-progress-bar v-if="loading" type="indeterminate"/>
        <ion-content>
            <img v-if="!productImage" :src="imageIcon"></img>
            <Lazyion-img v-else :src="productImage" :alt="product.list?.getName()"/>
            <ion-text>
                <h6 id="info">{{ $t("(Image and description for illustrative purposes only)") }}</h6>
                <br/>
                <h4 id="title">{{ product.list?.getName() }}</h4>
                <br/>
            </ion-text>
            <ion-grid>
                <ion-row>
                    <ion-col size="12" class="container-align-center">
                        <ion-button fill="solid" class="ion-no-margin" @click="openVideoPage" color="tertiary" v-if="videoUrl !== undefined">
                            <ion-icon :icon="ioniconsFilmOutline" color="primary"/>
                            <ion-text color="primary" class="space-between-button-and-icon">{{ $t("View demonstration video") }}</ion-text>
                        </ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
            <ion-text color="dark">
                <h6 class="description-title">{{ $t("description") }}</h6>
                <p id="description">{{ product.list?.getDesc() }}</p>
                <br/>
                <p class="description-title">{{ $t("last updated") }} {{ product.list?.getDate()?.toDate() }}</p>
            </ion-text>
        </ion-content>
        <ion-footer class="call-to-action-footer">
            <Lazycall-to-action :links="product.list" :key="product.list"/>
        </ion-footer>
    </ion-page>
</template>
  
<script lang="ts" setup>
import { Product } from '~/models/Product';
import imageIcon from '~/assets/images/image-icon.svg'
import { Browser } from '@capacitor/browser';
import { useDbCall } from '~/composables/api/useDb';
import { useRoute } from 'vue-router';
import { findDocInCollectionAction } from '~/services/actions/product-action';
import { useImageCache } from '#imports';
import { getAnalytics, logEvent } from "firebase/analytics";

const analytics = getAnalytics();

const route = useRoute()
const call = useDbCall()
const productImage = ref('' as string | Blob)
const { transformImageUrl } = useImageCache()

const product = reactive({ list: undefined as Product | undefined })
const loading = ref(true as boolean)

let videoUrl: string | undefined;

const openVideoPage = async () => {
    try {
        if (videoUrl !== undefined) {
            await Browser.open({ url: videoUrl });
        }
    } catch(e) {
        console.log("Browser não pôde ser aberto: "+e)
    }
}

function changeLoadingStatus(isLoading: boolean) {
  loading.value = isLoading
}

onMounted(async () => {
    try {
        findDocInCollectionAction(
            call.getCollection(),
            call.getField().id,
            "==",
            Number(route.params.id)
        ).then(async (data) => {
            product.list = data?.pop()
            videoUrl = product.list?.getVideoDemo()

            logEvent(analytics, 'screen_view', {
                firebase_screen: `${product.list?.getId()} - ${product.list?.getName()}`, 
                firebase_screen_class: 'product_id_page'
            });
            
            changeLoadingStatus(false)
            transformImageUrl(product.list).then(base64Url => productImage.value = base64Url)
        }).catch((e) => 
            console.log("Não foi possível encontrar o produto: "+e)
        )
    } catch(error) {
        console.log("Não foi possível obter informações sobre o produto")
    }
})
</script>

<style >
ion-action-sheet {
    --button-color: blue;
}

#open-action-sheet {
    --box-shadow:0px;
}

ion-toast, #title, .description-title, #info {
    text-align: center;
}

.description-title, #info {
    font-size: large; 
    color: gray; 
    font-style: oblique;
}
#description {
    text-align: center;
}
#info {
    font-size: small;
    margin-top: 0.3rem;
}
.call-to-action-footer {
    background-color: var(--ion-color-secondary);
    display: flex;
    justify-content: space-between;
}
</style>
  

