import { setKey } from './key'
import { modalController } from '@ionic/vue'

import productModal from '~/components/modal/product-info.vue';
import notificationsModal from '~/components/modal/component/notifications-modal.vue';
import helpModal from '~/components/modal/help-modal.vue';
import foundProductsModal from '~/components/modal/search-modal.vue';

export async function openProductModal(id: number) {
    setKey('cod',String(id))
    const modal = await modalController.create({ component: productModal })
    modal.present()
}

export async function openFoundProductsModal(name: string) {
    setKey("name",name)
    const modal = await modalController.create({ component: foundProductsModal })
    modal.present()
}

export async function openNotificationsModal() {
    const modal = await modalController.create({ component: notificationsModal })
    modal.present()
}

export async function openHelpModal() {
    const modal = await modalController.create({ component: helpModal })
    modal.present()
}

export function closeModal() {
    return () => modalController.dismiss(null, 'close')
}