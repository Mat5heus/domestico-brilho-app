import type { DocumentData } from "firebase/firestore"
import { App } from "~/models/App"

export function isAtLastVersion(currentVersion: App, lastVersion: App): boolean {
    if (currentVersion.versionCode < lastVersion.versionCode) {
        return true
    }
    return false
}

export function convertToApp(lastVersion: DocumentData): App {
    const response = new App(
        lastVersion.version, 
        lastVersion.versionCode,
        lastVersion.downloadLink,
        lastVersion.id,
        lastVersion.updatedAt
    )
    return response
}