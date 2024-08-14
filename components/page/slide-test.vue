<template>
    <div class="carrousel-container">
        <ion-text>
            <h5 class="section-title">{{ title }}</h5>
        </ion-text>


        <Swiper
            :modules="[SwiperAutoplay, SwiperEffectCreative]"
            :slides-per-view="1"
            :loop="true"
            :effect="'creative'"
            :autoplay="{
            delay: 8000,
            disableOnInteraction: true,
            }"
            :creative-effect="{
            prev: {
                shadow: false,
                translate: ['-20%', 0, -1],
            },
            next: {
                translate: ['100%', 0, 0],
            },
            }"
        >
            <SwiperSlide v-for="product in productsList" :key="productsList.id">
                <figure class="product-img-container">
                    <img @click="openProductsInfo(product?.getId().toString())" class="product_image" :alt="product?.getName()" :src="product?.getImage()"/>
                    <ion-text>
                        <figcaption class="desc-product-image">{{ "#"+product?.getId()+" - "+product?.getName() }}</figcaption>
                    </ion-text>
                </figure>
            </SwiperSlide>
        </Swiper>


    </div>
</template>

<script setup lang="ts">
//import { openProductModal } from '~/utils/open-modal';
import { Product } from '~/models/Product';
import { useIonRouter } from '@ionic/vue';

const router = useIonRouter()
const openProductsInfo = (id: string) => router.navigate('/product/'+id, 'forward', 'push')

const title: string = useAttrs().section_name as string
const productsList: Product[] = useAttrs().products as Product[]


</script>