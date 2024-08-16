import type { DocumentData } from 'firebase/firestore';

import { useCookie } from 'nuxt/app'
import { App } from '~/models/App';
import { Version } from '~/models/Version';
import { convertToApp } from '~/utils/keepUpdated';
import { getAppInfoList } from './useState';
import type { Reactive } from 'vue';

export const warnUserForUpdate = ref(false)
export let lastVersion: App

const hasCheckedForUpdates = useCookie('hasCheckedForUpdates',
  { 
    default: () => 'false'
  }
)

if (hasCheckedForUpdates.value !== 'true') {
  const currentVersion = new App(new Version(0,2,2), 2)
  getAppInfoList('AppInfo', 1).then((appInfo: Reactive<{ list: App[] }>) => {
    lastVersion = convertToApp(appInfo.list?.pop() as DocumentData)
    setTimeout(async () => {
      console.log('Verificando por atualizações...')
      warnUserForUpdate.value = await checkForUpdates(currentVersion, lastVersion)
    }, 5000);
  }).catch((e) => {
    console.error("Erro: "+e)
  })
  hasCheckedForUpdates.value = 'true'
}

async function checkForUpdates(currentVersion: App, lastVersion: App): Promise<boolean> {
  const response = isAtLastVersion(currentVersion, lastVersion)
  if(!response) {
    console.log("App está na versão mais recente!")
  }
  return response
}