interface version {
    major: number
    minor: number
    patch: number
    
    getMajor: () => number
    getMinor: () => number
    getPatch: () => number
}

export class Version implements version {
    patch: number
    major: number
    minor: number

    constructor(version: Version | number, minor: number | null = null, patch: number | null = null) {
        if(typeof version === 'object' && 'major' in version) {
            this.major = version.major
            this.minor = version.minor
            this.patch = version.patch
        } else  {
            this.major = version as number
            this.minor = minor as number
            this.patch = patch as number
        }
        
    }

    getMajor() {
        return this.major
    }

    getMinor() {
        return this.minor
    }

    getPatch() {
        return this.patch
    }
}
