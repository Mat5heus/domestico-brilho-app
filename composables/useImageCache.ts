// composables/useImageCache.ts
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Network } from '@capacitor/network';
import { isBase64Image } from "~/utils/string"
import md5 from "md5"
import type { Product } from '~/models/Product';

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

    const getFromCache = async (filename: string): Promise<string | null> => {
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

               saveImage(base64data, filename)

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

    const saveImage = async (imageUrl: string, filename: string) => {
        await Filesystem.writeFile({
            path: filename,
            data: imageUrl,
            directory: Directory.Cache,
        })
    }

    const getBase64FromCache = async (filename: string): Promise< string | null | Blob> => {
        try {
            const file = await Filesystem.readFile({
                directory: Directory.Cache,
                path: filename,
            })
            return file.data
        } catch (error) {
            console.log(`Base64 image not found in cache: ${filename}`);
            return null
        }
    }

    const getImageUrl = (cachedData: string | null, imageUrl: string, filename: string, cacheCallback: CallableFunction) => {
        if (cachedData) {
            if (!isBase64Image(cachedData)) {
                // Criar um Blob URL para o base64 recuperado do cache
                const byteCharacters = atob(cachedData);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray]);

                // Retornar o Blob URL
                return URL.createObjectURL(blob);
            }
            return cachedData
        } else {
            cacheCallback(imageUrl, filename);
            return imageUrl
        }
    }

     // Função para gerar o hash SHA-256 a partir do conteúdo base64
    const generateHashFromBase64 = (base64: string): string => {
        return md5(base64)
    }

    const urlOrBase64 = (product: Product): string | null => {
        let url = product.getImage()
        if(!url) {
            url = product.getUrlBase64()
            if(url) {
                return url
            } else {
                return null
            }
        }
        return url
    }

    const transformImageUrl = async (product: Product): Promise<string | null> => {
        const imageUrl = urlOrBase64(product)

        if(!imageUrl) {
            return null
        }

        if(!isBase64Image(imageUrl)) {
            const filename = extractFilenameFromUrl(imageUrl);
            const cachedData = await getFromCache(filename)

            return getImageUrl(cachedData, imageUrl, filename, cacheImage)
        } else {
            const filename = generateHashFromBase64(imageUrl.slice(0,50))
            const cachedData = await getBase64FromCache(filename)

            return getImageUrl(cachedData, imageUrl, filename, saveImage)
        }
    }

    return {
        transformImageUrl,
    }
}