import type { DocumentData } from 'firebase/firestore';

import { useCookie } from 'nuxt/app'
import { App } from '~/models/App';
import { Version } from '~/models/Version';
import { convertToApp } from '~/utils/keepUpdated';
import { createAlert } from '~/utils/alertComponent'
import { getAppInfoAction } from '~/services/actions/product-action';

export const useCheckForUpdates = () =>  {

  const hasCheckedForUpdates = useCookie('hasCheckedForUpdates',
    { 
      default: () => 'false'
    }
  )

  if (hasCheckedForUpdates.value !== 'true') {
    const currentVersion = new App(new Version(0,2,2), 2)
    console.log('Verificando por atualizações...')
    getAppInfoAction('AppInfo', 1).then((appInfo: App[]) => {
      const lastVersion = convertToApp(appInfo?.pop() as DocumentData)
      const isTheLastVersion = isAtLastVersion(currentVersion, lastVersion)
      setTimeout(async () => {
        if(isTheLastVersion) {
          createAlert(lastVersion).then(() => {
            console.log("Componente de alerta criado com sucesso!")
          }).catch((e) => {
            console.log("Não foi possivel carregar o componente de alert")
            throw new Error("There is a problem with the alert Component")
          })
        }
      }, 5000);
    }).catch((e) => {
      console.error("Erro: "+e)
    })
    hasCheckedForUpdates.value = 'true'
  }
}

