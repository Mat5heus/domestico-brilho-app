import { Storage } from '@ionic/storage';

const storage = new Storage()
// Sintaxe não permite inclusão do .create() fora da função

async function setKey(key: string, value: String): Promise<void> {
  try {
    await storage.create()
    await storage.set(key, value)
  } catch(error) {
    console.error("Error function setKey(): "+error)
  }
}

async function getKey(key: string): Promise<string | null> {
  let response: string | null
  try {
    await storage.create()
    response = String(
      await storage.get(key)
    )
    return response
  } catch(error) {
    console.error("Error function getKey(): "+error)
    return null
  }
}

async function deleteKey(key: string): Promise<void> {
  try {
    await storage.create()
    await storage.remove(key)
  } catch(error) {
    console.error("Error function removeKey(): "+error)
  }
}

async function deleteAllKeys(): Promise<void> {
  try {
    await storage.create()
    await storage.clear()
  } catch(error) {
    console.error("Error function clearKey(): "+error)
  }
}


export default {
  getKey,
  setKey,
  deleteKey,
  deleteAllKeys
}