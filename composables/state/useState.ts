import type { Product } from "~/models/Product"
import { findDocInCollectionAction } from "~/services/actions/product-action"
import type { UseDbCall } from "~/types/db"

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