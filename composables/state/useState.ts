import type { DocumentData, OrderByDirection } from "firebase/firestore"
import type { Reactive } from "vue"
import type { Product } from "~/models/Product"
import { getAllProductsAction } from "~/services/actions/product-action"


export async function getProductsList(

    collectionName: string,
    limitValue: number,
    orderByField: string | null = null,
    orderByDirection: OrderByDirection | undefined = undefined

    ): Promise<Reactive<{ list: Product[] }>> {

    const response: Reactive<{ list: Product[] }> = reactive({ 
        list: await getAllProductsAction(collectionName, limitValue, orderByField, orderByDirection),
    })
    return response
}