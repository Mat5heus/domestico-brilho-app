<template>
    <ion-card @click="openProductInfo(product?.getId().toString())">
        <img v-if="!productImage" :src="imageIcon"></img>
        <img
            class="product_image"
            :alt="product?.getName()"
            :src="productImage"
            loading="lazy"
            v-else
        />
        <ion-card-header>
            <ion-card-title class="desc-product-image">
                {{ "#"+product?.getId()+" - "+ formatDesc(product?.getName(), 21)}}
            </ion-card-title>
        </ion-card-header>
    </ion-card>
</template>
<script setup lang="ts">
//import { Product } from '~/models/Product';
import { formatDesc } from '~/utils/string';
import imageIcon from '~/assets/images/image-icon.svg'
import { useImageCache } from '~/composables/useImageCache';
//import { openProductInfo } from "~/utils/route-functions"
import { useIonRouter } from '@ionic/vue';
import { useI18n } from "#imports"
import { getAnalytics, logEvent } from "firebase/analytics";

const analytics = getAnalytics();

const productImage = ref('' as string | Blob)
const { product, routeInfo } = useAttrs()

const { locale } = useI18n()
const router = useIonRouter()

const localePath = (path: string) => {
    if(locale.value == "pt") {
        return path
    }
    return `/${locale.value}${path}`;
}

const openProductInfo = (id: string): void => {
    logEvent(analytics, 'select_item', {
        item_list_name: routeInfo.component,
        items: [{
            item_id: product?.getId(),
            item_name: product?.getName()
        }]
    })
    
    router.push({
        path: localePath(`/product/${id}`),
        query: {
            utm_source: routeInfo.component,
            utm_medium: routeInfo.location
        }
    })
}

useImageCache()
    .transformImageUrl(product)
        .then(base64Url => 
            productImage.value = base64Url
        )
</script>