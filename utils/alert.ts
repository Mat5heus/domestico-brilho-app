import type { App } from "~/models/App"

export function getAlertButtons(lastVersion: App): object[]{
    return [
        {
        text: "Depois",
        role: "cancel",
        handler: () => {
            console.log("Vai atualizar depois")
        }
        },
        {
        text: "Atualizar agora",
        role: "confirm",
        handler: () => {
            openUrl(lastVersion.getDownloadLink() as string)
        }
        }
    ]
}