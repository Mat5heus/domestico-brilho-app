// não functiona sem setup()
import { useIonRouter } from '@ionic/vue';
import { useI18n } from "#imports"
import type routerInfo from "~/type/routerInfo"

export function useGoToPath() {
    const { locale } = useI18n()
    const router = useIonRouter()

    const localePath = (path: string) => {
        if(locale.value == "pt") {
            return path
        }
        return `/${locale.value}${path}`;
    }

    const openProductInfo = (id: string, routeInfo: routerInfo): void => {
        router.push({
            path: localePath(`/product/${id}`),
            query: {
                utm_source: routeInfo.component,
                utm_medium: routeInfo.location
            }
        })
    }

    return {
        openProductInfo
    }
}
