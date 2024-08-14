import type { Links } from '~/models/Links';

export function createActionSheetButtons(links: Links): object[] {
    return [
        {
            text: 'Comprar no Aliexpress',
            data: {
            action: 'Comprar no Aliexpress' 
            },
            handler: () => {
                openMarketplace(links.getAliexpress())
            }
        },
        {
            text: 'Comprar na Shopee',
            data: {
                action: "Shopee"
            },
            handler: () => {
                openMarketplace(links.getShopee())
            }
        },
    ]
}

function openMarketplace(url: string) {
  window.open(url)
}