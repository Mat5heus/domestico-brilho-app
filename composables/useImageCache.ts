// composables/useImageCache.ts
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Network } from '@capacitor/network';

export const useImageCache = () => {

    const extractFilenameFromUrl = (url: string): string => {
        const urlObj = new URL(url)
        return urlObj.pathname.split('/').pop() ?? 'default_filename'
    }

    const getMimeTypeFromFileName = (filename: string): string => {
        const extension = filename.split('.').pop()?.toLowerCase();
        switch (extension) {
        case 'png':
            return 'image/png';
        case 'jpg':
            return 'image/jpeg';
        case 'jpeg':
            return 'image/jpeg';
        case 'webp':
            return 'image/webp';
        case 'svg':
            return 'image/svg+xml';
        default:
            return 'application/octet-stream';
        }
    }

    const getFromCache = async (filename: string): Promise<string | null | Blob> => {
        const mimeType = getMimeTypeFromFileName(filename)
        try {
            const file = await Filesystem.readFile({
                directory: Directory.Cache,
                path: filename,
            })
            return `data:${mimeType};base64,${file.data}`;
        } catch (error) {
            console.log(`Image not found in cache: ${filename}`);
            return null
        }
    }

    const cacheImage = async (url: string, filename: string): Promise<string> => {
        const response = await fetch(url);
        const blob = await response.blob();
        const mimeType = response.headers.get('Content-Type') || getMimeTypeFromFileName(filename);

        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64data = reader.result?.toString().split(',')[1];
                if (!base64data) {
                    reject(new Error('Failed to convert image to base64.'));
                    return
                }

                await Filesystem.writeFile({
                    path: filename,
                    data: base64data,
                    directory: Directory.Cache,
                })

                const dataUri = `data:${mimeType};base64,${base64data}`;
                resolve(dataUri);
            }

            reader.onerror = () => reject(new Error('Failed to read blob as base64'));
            reader.readAsDataURL(blob)
        })
    }

    const isOnline = async (): Promise<boolean> => {
        const status = await Network.getStatus();
        return status.connected
    }

    const transformImageUrl = async (imageUrl: string | undefined): Promise<string | Blob> => {
        const filename = extractFilenameFromUrl(imageUrl);
        let cachedData = await getFromCache(filename);

        if (cachedData) {
            return cachedData
        } else {
            if (await isOnline()) {
                return await cacheImage(imageUrl, filename);
            } 
            return '/assets/icons/svg/dummy.svg';
        }
    }

    return {
        transformImageUrl,
    }
}