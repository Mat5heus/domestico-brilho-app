<template>
    <ion-grid>
        <ion-row>
            <ion-col>
                <ion-text>
                    <h4>{{ sectionName }}</h4>
                </ion-text>
            </ion-col>
        </ion-row>
        <ion-row>
            <ion-col class="group-of-products" size="6" v-for="product in productsList" :key="productsList.id">
                <figure class="product-img-container">
                    <img class="product_image" 
                        @click="openProductInfo(product?.getId().toString())" 
                        :alt="product?.getName()" 
                        :src="product?.getImage()"
                    />
                    <ion-text>
                        <figcaption class="desc-product-image">
                            {{ "#"+product?.getId()+" - "+product?.getName() }}
                        </figcaption>
                    </ion-text>
                </figure>                
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script lang="ts" setup>
import { Product } from '~/models/Product';
import { useIonRouter } from '@ionic/vue';

const router = useIonRouter()
const openProductInfo = (id: string) => router.navigate('/product/'+id, 'forward', 'push')

const productsList: Product[] = useAttrs().products as Product[]
const sectionName: string = useAttrs().sectionName as string

</script>