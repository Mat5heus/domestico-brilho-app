import type { Links } from '~/models/Links';

export function createActionSheetButtons(links: Links): object[] {
    return [
        {
            text: 'Comprar no Aliexpress',
            data: {
            action: 'Comprar no Aliexpress' 
            },
            handler: () => {
                openUrl(links.getAliexpress())
            }
        },
        {
            text: 'Comprar na Shopee',
            data: {
                action: "Shopee"
            },
            handler: () => {
                openUrl(links.getShopee())
            }
        },
    ]
}

export function openUrl(url: string) {
  window.open(url)
}