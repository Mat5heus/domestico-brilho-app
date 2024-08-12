<template>
    <modal-head name="Resultados da busca"/>
    <ProductsGrid :products="productsList"/>
</template>

<script lang="ts" setup>
import { findDocInCollectionAction } from '~/services/actions/product-action';
import ProductsGrid from '../page/products-grid.vue';
import type { DocumentData } from 'firebase/firestore';
import { getKey } from '~/utils/key';

let productsList: unknown[] | DocumentData[]
const query: string | undefined = await getKey("name")
if(query) {
    productsList = await findDocInCollectionAction("Products", "name", ">=", query)
} else {
    console.error("Não foi possivel recuperar o valor")
}
</script>