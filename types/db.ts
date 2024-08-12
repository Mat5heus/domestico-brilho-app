import type { OrderByDirection } from "firebase/firestore"

export interface DbCallConfig {
    collection: string
    limitValue: number
    orderByField: string
    orderByDirection: OrderByDirection
}

export interface UseDbCall {
    /**
     * Obtém o nome da coleção será buscada no banco de dados.
     * 
     * @returns O nome da coleção como uma `string`.
     */
    getCollection: () => string

    /**
     * Obtém quantidade de dados a serem consultados no banco de dados.
     * 
     * @returns O valor do limite como um `number`.
     */
    getLimitValue: () => number

    /**
     * Obtém o campo pelo qual os resultados serão ordenados.
     * 
     * @returns O nome do campo de ordenação como uma `string`.
     */
    getOrderByField: () => string

    /**
     * Obtém a direção da ordenação dos resultados.
     * 
     * @returns A direção da ordenação como um valor do tipo `OrderByDirection`.
     */
    getOrderByDirection: () => OrderByDirection
}