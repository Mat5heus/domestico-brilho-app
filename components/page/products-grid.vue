<template>
    <ion-grid>
        <ion-row>
            <ion-col class="group-of-products" size="6" v-for="item in products" :key="products.id">
                <figure class="product-img-container">
                    <img class="product_image" @click="openProductModal(item.id)" :alt="item.name" :src="formatUrl(item.image)" />
                    <figcaption class="desc-product-image">{{ "#"+item.id+" - "+item.name }}</figcaption>
                </figure>                
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script lang="ts" setup>
import { formatUrl } from '~/utils/string';
import { openProductModal } from '~/utils/open-modal';

const products = useAttrs().products

</script>