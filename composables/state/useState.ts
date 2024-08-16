import type { OrderByDirection, WhereFilterOp } from "firebase/firestore"
import type { Reactive } from "vue"
import type { App } from "~/models/App"
import type { Product } from "~/models/Product"
import { findDocInCollectionAction, getAllProductsAction, getAppInfoAction } from "~/services/actions/product-action"


export async function getProductsList(

    collectionName: string,
    limitValue: number,
    orderByField: string | null = null,
    orderByDirection: OrderByDirection | undefined = undefined

    ): Promise<Reactive<{ list: Product[] }>> {

    const productsList: Reactive<{ list: Product[] }> = reactive({ 
        list: await getAllProductsAction(collectionName, limitValue, orderByField, orderByDirection),
    })
    return productsList
}

export async function getAppInfoList(

    collectionName: string,
    limitValue: number,
    orderByField: string | null = null,
    orderByDirection: OrderByDirection | undefined = undefined

    ): Promise<Reactive<{ list: App[] }>> {

    const appInfo: Reactive<{ list: App[] }> = reactive({ 
        list: await getAppInfoAction(collectionName, limitValue, orderByField, orderByDirection),
    })
    return appInfo
}

export async function findProducts(

    collectionName: string,
    fieldName: string,
    operador: WhereFilterOp,
    query: number | string | undefined

    ): Promise<Reactive<{ list: Product[] }>> {

    const productsList: Reactive<{ list: Product[] }> = reactive({ 
        list: await findDocInCollectionAction(collectionName, fieldName, operador, query)
    })
    return productsList
}
