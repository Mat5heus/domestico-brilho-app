import type { OrderByDirection, WhereFilterOp } from "firebase/firestore"

interface Fields {
    date: string
    name: string
    id: string
    desc: string
}

export interface DbCallConfig {
    collection: string
    limitValue: number
    field: Fields
    orderByDirection: OrderByDirection
}

export interface useFields {
    getName: () => string
    getDate: () => string
    getId: () => string
    getDesc: () => string
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
    getField: () => Fields

    /**
     * Obtém a direção da ordenação dos resultados.
     * 
     * @returns A direção da ordenação como um valor do tipo `OrderByDirection`.
     */
    getOrderByDirection: () => OrderByDirection

    /**
     * Obtém o operador de comparação de dados no banco de dados.
     * 
     * @returns o operador de comparação do tipo `WhereFilterOp`.
     */
    //getOperator: () => WhereFilterOp
}