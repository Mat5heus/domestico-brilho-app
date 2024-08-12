<template>
    <div class="carrousel-container">
        <ion-text>
            <h5 class="section-title">{{ props.section_name }}</h5>
        </ion-text>
        <swiper-container :slides-per-view="2.5" :space-between="15" :centered-slides="false" :autoplay="true" :loop="true" :pagination="false">
            <swiper-slide v-for="product in props.list" :key="props.list.id">
                <figure class="product-img-container">
                    <img @click="openProductModal(product.getId())" class="product_image" :alt="product.getName()" :src="product.getImage()"/>
                    <ion-text>
                        <figcaption class="desc-product-image">{{ "#"+product.id+" - "+product.name }}</figcaption>
                    </ion-text>
                </figure>
            </swiper-slide>
        </swiper-container>  
    </div>
</template>

<script setup lang="ts">
import { openProductModal } from '~/utils/open-modal';

const props = useAttrs()
</script>