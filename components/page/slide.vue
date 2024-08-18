<template>
    <div class="carrousel-container">
        <ion-text>
            <h5 class="section-title">{{ title }}</h5>
        </ion-text>
        <Swiper
            :modules="modules"
            :slidesPerView="2"
            :grabCursor="true"
            :loop="true"
            :autoplay="{
                delay: 2000,
                disableOnInteraction: false
            }"
        >
            <SwiperSlide  v-for="product in productsList" :key="productsList.id">
                <figure class="product-img-container">
                    <img 
                        @click="openProductsInfo(product?.getId().toString())" 
                        class="product_image" :alt="product?.getName()" 
                        :src="product?.getImage()"
                    />
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
import { Autoplay } from 'swiper/modules';

const router = useIonRouter()
const openProductsInfo = (id: string) => router.navigate('/product/'+id, 'forward', 'push')

const title: string = useAttrs().section_name as string
const productsList: Product[] = useAttrs().products as Product[]

const modules = [ Autoplay ]

</script>