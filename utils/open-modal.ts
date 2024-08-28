import { modalController } from '@ionic/vue'

import notificationsModal from '~/components/modal/component/notifications-modal.vue';
import helpModal from '~/components/modal/help-modal.vue';

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