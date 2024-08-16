import type { OrderByDirection, WhereFilterOp } from "firebase/firestore"
import type { Reactive } from "vue"
import type { App } from "~/models/App"
import type { Product } from "~/models/Product"
import { findDocInCollectionAction, getAppInfoAction } from "~/services/actions/product-action"
import type { UseDbCall } from "~/types/db"


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

export async function getProductsFromRoute(call: UseDbCall,route: object): Promise<Product[] | void> {
    if ('query' in route && 'q' in route.query) {
        const query: string = route.query.q as string
        const showFoundProductsGrid = await findDocInCollectionAction(
            call.getCollection(),
            call.getField().name,
            '>=',
            capitalize(
                query.toLocaleLowerCase()
            )
        )
        return showFoundProductsGrid
    }
}

export async function getProductsFromQuery(call: UseDbCall, query: string): Promise<Product[] | void> {
    if (query !== undefined) {
        const showFoundProductsGrid = await findDocInCollectionAction(
            call.getCollection(),
            call.getField().name,
            '>=',
            capitalize(
                query.toLocaleLowerCase()
            )
        )
   
        return showFoundProductsGrid
    }
}