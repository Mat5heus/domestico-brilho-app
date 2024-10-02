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
            <ion-col class="group-of-products" size="6" v-for="(product, index) in products" :key="products.id">
                <product-card v-if="index < 2" :product="product" :routeInfo="routeInfo"/>
                <Lazyproduct-card v-else :product="product" :routeInfo="routeInfo"/>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script lang="ts" setup>
const { routeInfo, products, sectionName } = useAttrs()
</script>