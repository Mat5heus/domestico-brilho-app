<template>
    <div class="carrousel-container">
        <ion-text>
            <h5 class="section-title">{{ title }}</h5>
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
            <SwiperSlide :lazy="true"  v-for="product in productsList" :key="productsList.id">
                <Lazyproduct-card :product="product"/>      
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<script setup lang="ts">
import { Product } from '~/models/Product';
import { Autoplay } from 'swiper/modules';

const title: string = useAttrs().section_name as string
const productsList: Product[] = useAttrs().products as Product[]

const modules = [ Autoplay ]

</script>