import { alertController } from "@ionic/vue"

export async function createAlert(content: any) {
    const alert = await alertController.create(content)
    await alert.present()
}

