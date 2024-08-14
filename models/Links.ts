import type { LinksData, UseLinks } from "~/types/Product"

export class Links implements UseLinks, LinksData {
    
    aliexpress: string
    shopee: string

    constructor(links: Links) {
        this.aliexpress = links.aliexpress
        this.shopee = links.shopee
    }

    public getAliexpress() {
        return this.aliexpress
    }

    public getShopee() {
        return this.shopee
    }

}