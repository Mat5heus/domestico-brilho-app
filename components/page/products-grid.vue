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
                <product-card :product="product"/>           
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script lang="ts" setup>
import { Product } from '~/models/Product';

const productsList: Product[] = useAttrs().products as Product[]
const sectionName: string = useAttrs().sectionName as string

</script>