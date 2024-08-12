<script lang="ts">
export function createActionSheetButtons(links: object) {
    return [
        {
            text: 'Comprar no Aliexpress',
            data: {
            action: 'Comprar no Aliexpress' 
            },
            handler: () => {
                open_marketplace(links.aliexpress)
            }
        },
        {
            text: 'Comprar no Shopee',
            data: {
                action: "Shopee"
            },
            handler: () => {
                open_marketplace(links.shopee)
            }
        },
    ]
}

function open_marketplace(url: string) {
  window.open(url)
}

export default {
    components: {
        createActionSheetButtons
    }
}
</script>