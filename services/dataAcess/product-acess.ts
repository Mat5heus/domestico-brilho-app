//import { db } from "~/plugins/firebase-config.vue";
import { collection, addDoc, setDoc, doc, updateDoc, getDoc, getDocs, DocumentReference, type DocumentData, query, where, QuerySnapshot, orderBy, limit, Query, Firestore, FieldPath, type WhereFilterOp, type OrderByDirection, QueryDocumentSnapshot } from "firebase/firestore";
import type { ProductData } from "~/types/Product";

const db: Firestore = useNuxtApp().$firestore

export async function addProductAcess(collectionName: string, body: object): Promise<DocumentReference<object, DocumentData>> {
    const response: DocumentReference<object, DocumentData> = await addDoc(collection(db, collectionName), body)
    return response
}

export async function setProductAcess(collectionName: string, id: string, body: object): Promise<void> {
    await setDoc(doc(db, collectionName, id), body)
}

export async function updateProductAcess(collectionName: string, id: string, body: object): Promise<void> {
    await updateDoc(doc(db, collectionName, id), body)
}

export async function getProductAcess(collectionName: string, id: string): Promise<QueryDocumentSnapshot<ProductData>> {
    const response: QueryDocumentSnapshot<ProductData> = await getDoc(doc(db, collectionName, id))
    return response
}

export async function findDocInCollectionAcess(collectionName: string, prop: string | FieldPath, operator: WhereFilterOp, attr: string | number | undefined): Promise<QuerySnapshot<ProductData>>  {
    const q: Query<ProductData, DocumentData> = query(collection(db, collectionName), where(prop, operator, attr))
    const response: QuerySnapshot<ProductData> = await getDocs(q)
    return response
}

export async function getAllProductsAcess(collectionName: string, limitValue: number, orderByField: string | null = null, OrderByDirection: OrderByDirection | undefined = undefined): Promise<QuerySnapshot<ProductData>>  {
    try {
        let q: Query<ProductData, DocumentData>
        if(orderByField) {
            q = query(collection(db, collectionName), orderBy(orderByField, OrderByDirection), limit(limitValue))
        } else {
            q = query(collection(db, collectionName), limit(limitValue))
        }
        const response: QuerySnapshot<ProductData> = await getDocs(q)
        return response
    } catch(e) {
        console.error("Erro na funcao getAllProductAcess"+e)
        throw new Error('Não foi possível obter os produtos.')
    }
}