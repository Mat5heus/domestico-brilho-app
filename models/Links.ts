import { formatUrl } from "~/utils/string"
import type { UseLinks } from "~/types/Product"


export class Links implements UseLinks {
    
    private aliexpress: string
    private shopee: string

    constructor(links: Links) {
        this.aliexpress = links.aliexpress
        this.shopee = links.shopee
    }

    public getAliexpress() {
        return formatUrl(this.aliexpress)
    }

    public getShopee() {
        return formatUrl(this.shopee)
    }

}