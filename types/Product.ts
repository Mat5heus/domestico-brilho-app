import type { DocumentData, Timestamp } from "firebase/firestore"
import type { Links } from "~/models/Links"


export interface ProductData { 
    id: number
    name: string
    desc: string
    links: Links
    image: string | null
    imageUrlBase64: string | null
    date: Timestamp
    likes: number | undefined
}

export interface LinksData {
    aliexpress: string
    shopee: string
}

export interface UseLinks {
    /**
     * Traz o link do produto no Aliexpress
     * @returns o link da página do produto em `string`
     */
    getAliexpress: () => string

    /**
     * Traz o link do produto no Shopee
     * @returns o link da página do produto em `string`
     */
    getShopee: () => string
}


export interface UseProduct { 

    /**
     * Recupera o Id do produto
     * @returns o id no tipo `number` 
     */
    getId: () => number

    /**
     * Recupera o nome do produto
     * @returns o nome no tipo `string` 
     */
    getName: () => string

    /**
     * Recupera o descrição do produto
     * @returns o descrição no tipo `string` 
     */
    getDesc: () => string

    /**
     * Recupera os links do produto
     * @returns o links no tipo `Links` 
     */
    getLinks: () => Links

    /**
     * Recupera o data de cadastro do produto
     * @returns a data no tipo `Timestamp` 
     */
    getDate: () => Timestamp

    /**
     * Recupera a url da imagem do produto
     * @returns a data no tipo `string | null` 
     */
    getImage: () => string | null

    /**
     * Recupera a url base64 da imagem do produto
     * @returns a data no tipo `string | null` 
     */
    getUrlBase64: () => string | null

    /**
     * Recupera os likes do produto
     * @returns os likes no tipo `number | undefined`
     */
    getLikes: () => number | undefined

}