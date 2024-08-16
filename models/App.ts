import type { Timestamp } from "firebase/firestore"
import type { Version  } from "./Version"

interface app {
    id: number | null
    updatedAt: Timestamp | null
    version: Version
    versionCode: number
    downloadLink: string | null

    getId: () => number | null
    getUpdatedAt: () => Timestamp | null
    getVersion: () => Version
    getVersionCode: () => number
    getDownloadLink: () => string | null
}

export class App implements app {
    id: number | null
    updatedAt: Timestamp | null
    version: Version
    versionCode: number
    downloadLink: string | null

    constructor(version: Version, VersionCode: number, downloadLink: string | null = null,id: number | null = null, updatedAt: Timestamp | null = null) {
        this.id = id
        this.updatedAt = updatedAt
        this.version = version
        this.versionCode = VersionCode
        this.downloadLink = downloadLink
    }

    getId() {
        return this.id
    }

    getUpdatedAt() {
        return this.updatedAt
    }

    getVersion() {
        return this.version
    }

    getVersionCode() {
        return this.versionCode
    }

    getDownloadLink() {
        return this.downloadLink
    }
}

