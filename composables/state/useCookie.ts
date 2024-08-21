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
            createAlert(lastVersion)
          }
        }, 5000);
      }).catch((e) => console.error("Erro: "+e))

      hasCheckedForUpdates.value = 'true'
    }

  }).catch((e) => console.error("Erro: "+e))
  
}

