import type { DocumentData } from 'firebase/firestore';
import { useCookie } from 'nuxt/app'
import { convertToApp } from '~/utils/keepUpdated';
import { createAlert } from '~/utils/alertComponent'
import { getAppInfoAction } from '~/services/actions/product-action';
import { App, type AppInfo, type AppPlugin } from '@capacitor/app'

export const useCheckForUpdates = () =>  {
  const hasCheckedForUpdates = useCookie('hasCheckedForUpdates', { default: () => 'false' })

  App.getInfo().then((appInfo: AppInfo) => {
    const currentVersionCode: number = parseInt(appInfo.build)

    if (hasCheckedForUpdates.value !== 'true') { 

      getAppInfoAction('AppInfo', 1).then((appInfoFromDb) => {
        const lastVersion = convertToApp(appInfoFromDb?.pop() as DocumentData)
        setTimeout(async () => {
          if(isAtLastVersion(currentVersionCode, lastVersion)) {
            const alertComponent = {
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
            }
            createAlert(alertComponent)
          }
        }, 5000);
      }).catch((e) => console.error("Erro: "+e))

      hasCheckedForUpdates.value = 'true'
    }

  }).catch((e) => console.log("Não é possível obter informações no App no modo WEB"))
  
}

