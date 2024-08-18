<template>
    <div class="carrousel-container">
        <ion-text>
            <h5 class="section-title">{{ title }}</h5>
        </ion-text>
        <swiper-container :slides-per-view="2.5" :space-between="15" :centered-slides="false" :autoplay="true" :loop="true" :pagination="false">
            <swiper-slide v-for="product in productsList" :key="productsList.id">
                <figure class="product-img-container">
                    <img @click="openProductsInfo(product?.getId().toString())" class="product_image" :alt="product?.getName()" :src="product?.getImage()"/>
                    <ion-text>
                        <figcaption class="desc-product-image">{{ "#"+product?.getId()+" - "+product?.getName() }}</figcaption>
                    </ion-text>
                </figure>
            </swiper-slide>
        </swiper-container>  
    </div>
</template>

<script setup lang="ts">
import { Product } from '~/models/Product';
import { useIonRouter } from '@ionic/vue';

const router = useIonRouter()
const openProductsInfo = (id: string) => router.navigate('/test/'+id, 'forward', 'push')

const title: string = useAttrs().section_name as string
const productsList: Product[] = useAttrs().products as Product[]


</script>