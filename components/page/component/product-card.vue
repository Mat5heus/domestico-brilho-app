<template>
    <ion-card @click="openProductInfo(product?.getId().toString())">
        <img class="product_image"
            :alt="product?.getName()" 
            :src="product?.getImage()"
            loading="lazy"
        />
        <ion-card-header>
            <ion-card-title class="desc-product-image">
                {{ "#"+product?.getId()+" - "+ formatDesc(product?.getName(), 21)}}
            </ion-card-title>
        </ion-card-header>
    </ion-card>
</template>
<script setup lang="ts">
import { Product } from '~/models/Product';
import { formatDesc } from '~/utils/string';

const product: Product = useAttrs().product as Product

const router = useIonRouter()
const openProductInfo = (id: string) => {
    router.navigate(
        '/product/'+id,
        'forward',
        'push'
    )
}
</script>