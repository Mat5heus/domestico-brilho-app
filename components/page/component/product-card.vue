<template>
    <ion-card @click="openProductInfo(product?.getId().toString())">
        <img class="product_image"
            :alt="product?.getName()"
            :src="productImage"
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
import { useImageCache } from '~/composables/useImageCache';

const productImage = ref('' as string | Blob)
const product: Product = useAttrs().product as Product
const router = useIonRouter()
const { transformImageUrl } = useImageCache()

const openProductInfo = (id: string): void => {
    router.navigate(
        '/product/'+id,
        'forward',
        'push'
    )
}
onMounted(async () => {
    transformImageUrl(product?.getImage()).then(base64Url => productImage.value = base64Url)
})
</script>