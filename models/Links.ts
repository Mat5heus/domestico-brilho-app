import type { LinksData, UseLinks } from "~/types/Product"

export class Links implements UseLinks, LinksData {
    
    aliexpress: string
    shopee: string

    constructor(links: Links) {
        try {
            this.aliexpress = links.aliexpress
            this.shopee = links.shopee
        } catch(e) {
            console.error("Não foi possivel obter os links do produto: "+e)
            throw new Error("Problema nas instanciação de links")
        }
    }

    public getAliexpress() {
        return this.aliexpress
    }

    public getShopee() {
        return this.shopee
    }
}

export default {
    Links
}