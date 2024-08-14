<template>
    <modal-head name="Resultados da busca"/>
    <products-grid :products="products.list"/>
</template>

<script lang="ts" setup>
import { getKey } from '~/utils/key';
import { findProducts } from '~/composables/state/useState';
import { useDbCall } from '~/composables/api/useDb';
import type { UseDbCall } from '~/types/db';
import type { Product } from '~/models/Product';
import type { Reactive } from 'vue';

const call: UseDbCall = useDbCall()

const products: Reactive<{ list: Product[] }>= await findProducts(
    call.getCollection(), 
    call.getField().name,
    ">=",
    await getKey("name")
)

</script>