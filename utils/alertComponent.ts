import type { App } from "~/models/App"
import { alertController } from "@ionic/vue"
import { openUrl } from "./action-sheets"

export async function createAlert(lastVersion: App) {
    const alert = await alertController.create({
        header: "Atualização disponivel!",
        message: "Uma nova versão do app está disponível, deseja atualizar agora?" ,
        buttons: [
            {
                text: "Não",
                role: "cancel",
                handler: () => console.log("Vai atualizar depois"),
                cssClass: 'alert-button-cancel',

            },
            {
                text: "Atualizar",
                role: "confirm",
                handler: () => openUrl(lastVersion?.getDownloadLink() as string),
                cssClass: 'alert-button-confirm',
                
            },
        ],
    })
    await alert.present()
}

