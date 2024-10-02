import { getAnalytics, logEvent } from "firebase/analytics";
import type { Product } from '~/models/Product';

interface store {
    store: string,
    link: string
}

export function createActionSheetButtons(product: Product, buttons: object): object[] {
    const linksList: object[] = []
    let aliexpress: string, shopee: string
    try {
        aliexpress = product?.getLinks().getAliexpress()
        if(aliexpress) {
            linksList.push(
                {
                    text: buttons.text.aliexpress,
                    data: {
                        action: buttons.text.aliexpress
                    },
                    handler: () => {
                        analytictsLog(product, { store: "Aliexpress", link: aliexpress }, openUrl)
                    }
                },
            )
        }
    } catch(e) {
        console.log("Não foi possivel obter o link do Aliexpress: "+e)
    }
    try {
        shopee = product?.getLinks().getShopee()
        if(shopee) {
            linksList.push(
                {
                    text: buttons.text.shopee,
                    data: {
                        action: buttons.text.shopee
                    },
                    handler: () => {
                        analytictsLog(product, { store: "Shopee", link: shopee }, openUrl)
                    }
                },
            )
        }
    } catch(e) {
        console.log("Não foi possivel obter o link do Shopee: "+e)
    }
    return linksList
}

function analytictsLog(product: Product, storeInfo: store, callExternalPage: CallableFunction) {
    const analytics = getAnalytics()
    logEvent(analytics, 'view_item', {
        items: [
            {
                item_id: product?.getId(),
                item_name: product?.getName(),
                affiliation: storeInfo.store
            }
        ]
    })
    callExternalPage(storeInfo.link)
}

export function openUrl(url: string) {
    window.open(url)
}
