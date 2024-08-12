import { formatUrl } from '~/utils/string'
import { updateProductAcess, getAllProductsAcess, getProductAcess, setProductAcess, addProductAcess, findDocInCollectionAcess  } from '../dataAcess/product-acess'
import type { DocumentData, QueryDocumentSnapshot, QuerySnapshot, Query, WhereFilterOp, FieldPath, OrderByDirection } from 'firebase/firestore'
import { Product } from '~/models/Product'

export async function addProductAction(collectionName: string, body: object) {
    const response = await addProductAcess(collectionName, body)
    return response.id
}

export async function setProductAction(collectionName: string, id: string, body: object) {
    const response: any = await setProductAcess(collectionName, id, body)
    return response
}

export async function updateProductAction(collectionName: string, id: string, body: object) {
    const response: any = await updateProductAcess(collectionName, id, body)
    return response
}

export async function findDocInCollectionAction(collectionName: string, prop: string | FieldPath, operator: WhereFilterOp, attr: unknown): Promise<unknown[] | DocumentData[] > {
    const querySnapshot: QuerySnapshot<unknown, DocumentData> = await findDocInCollectionAcess(collectionName, prop, operator, attr)
    const productsList: unknown[] = []
    try {
        querySnapshot.forEach((doc: QueryDocumentSnapshot<unknown, DocumentData>) => {
            productsList.push(doc.data())
        })
    } catch(error) {
        console.log("Error function findDocInCollectionAction")
    }
    return productsList
}

export async function getProductAction(collectionName: string, id: string): Promise<DocumentData | null>{
    const response = await getProductAcess(collectionName, id)
    try {
        if (response.exists()) {
            response.data().image = formatUrl(response.data().image)
            return response.data()
        } 
    } catch (e) {
        console.error("Este documento não existe!"+e)
        throw new Error("Não foi possivel obter o produto")
    }
    return null
}

export async function getAllProductsAction(collectionName: string, limitValue: number, orderByField: string | null = null, orderByDirection: OrderByDirection | undefined = undefined): Promise<Product[]> {
    const response: QuerySnapshot<unknown, DocumentData> = await getAllProductsAcess(collectionName, limitValue, orderByField, orderByDirection)
    const product: Product[] = []
    response.forEach((doc: QueryDocumentSnapshot<unknown, DocumentData>) => {
        product.push(convertToProduct(doc.data()))
    })
    return product
}

function convertToProduct(doc: DocumentData | unknown): Product {
    const response = new Product(doc.id, doc.name, doc.image, doc.desc, doc.date, doc.links)
    return response
}