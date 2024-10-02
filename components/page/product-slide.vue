<template>
    <div class="carrousel-container">
        <ion-text>
            <h5 class="section-title">{{ sectionName }}</h5>
        </ion-text>
        <Swiper
            :modules="modules"
            :slidesPerView="2.1"
            :grabCursor="true"
            :loop="true"
            :autoplay="{
                delay: 2000,
                disableOnInteraction: false
            }"
        >
            <SwiperSlide :lazy="true"  v-for="(product, index) in products" :key="products.id">
                <product-card v-if="index < 2" :product="product" :routeInfo="routeInfo"/>
                <Lazyproduct-card v-else :product="product" :routeInfo="routeInfo"/>
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<script setup lang="ts">
//import { Product } from '~/models/Product';
import { Autoplay } from 'swiper/modules';

const { sectionName, products, routeInfo } = useAttrs()
//const productsList: Product[] = useAttrs().products as Product[]

const modules = [ Autoplay ]

</script>