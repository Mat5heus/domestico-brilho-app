import { Storage } from '@ionic/storage';

const storage = new Storage()
// Sintaxe não permite inclusão do .create() fora da função

export async function setKey(key: string, value: String): Promise<void> {
  try {
    await storage.create()
    await storage.set(key, value)
  } catch(error) {
    console.error("Error function setKey(): "+error)
  }
}

export async function getKey(key: string): Promise<undefined | string> {
  let response: string | undefined
  try {
    await storage.create()
    response = String(await storage.get(key))
    return response
  } catch(error) {
    console.error("Error function getKey(): "+error)
  }
}