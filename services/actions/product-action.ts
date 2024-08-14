import { formatUrl } from '~/utils/string'
import { updateProductAcess, getAllProductsAcess, getProductAcess, setProductAcess, addProductAcess, findDocInCollectionAcess  } from '../dataAcess/product-acess'
import type { DocumentData, QueryDocumentSnapshot, QuerySnapshot, Query, WhereFilterOp, FieldPath, OrderByDirection, DocumentReference } from 'firebase/firestore'
import { Product } from '~/models/Product'
import type { ProductData } from '~/types/Product'
import { Links } from '~/models/Links'

export async function addProductAction(collectionName: string, body: object): Promise<DocumentReference<Object, DocumentData>> {
    const response = await addProductAcess(collectionName, body)
    return response
}

export async function setProductAction(collectionName: string, id: string, body: object): Promise<void> {
    await setProductAcess(collectionName, id, body)
}

export async function updateProductAction(collectionName: string, id: string, body: object): Promise<void> {
    await updateProductAcess(collectionName, id, body)
}

export async function findDocInCollectionAction(collectionName: string, prop: string | FieldPath, operator: WhereFilterOp, attr: string | number | undefined): Promise<Product[]> {
    const querySnapshot: QuerySnapshot<ProductData, DocumentData> = await findDocInCollectionAcess(collectionName, prop, operator, attr)
    const productsList: Product[] = []
    try {
        querySnapshot.forEach((document: QueryDocumentSnapshot<ProductData, DocumentData>) => {
            productsList.push(convertToProduct(document))
        })
    } catch(error) {
        console.log("Error function findDocInCollectionAction")
    }
    return productsList
}

export async function getProductAction(collectionName: string, id: string): Promise<Product | null>{
    const document: QueryDocumentSnapshot<ProductData> = await getProductAcess(collectionName, id)
    try {
        if (document.exists()) {
            return convertToProduct(document)
        } 
    } catch (e) {
        console.error("Este documento não existe!"+e)
        throw new Error("Não foi possivel obter o produto")
    }
    return null
}

export async function getAllProductsAction(collectionName: string, limitValue: number, orderByField: string | null = null, orderByDirection: OrderByDirection | undefined = undefined): Promise<Product[]> {
    const response: QuerySnapshot<ProductData> = await getAllProductsAcess(collectionName, limitValue, orderByField, orderByDirection)
    const product: Product[] = []
    response.forEach((document: QueryDocumentSnapshot<ProductData>) => {
        product.push(convertToProduct(document))
    })
    return product
}

function convertToProduct(document: QueryDocumentSnapshot<ProductData, DocumentData>): Product {
    const data: ProductData = document.data()
    const response = new Product(
        data.id,
        data.name,
        data.image,
        data.desc, 
        data.date, 
        new Links(data.links)
    )
    return response
}