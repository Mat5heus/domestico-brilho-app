import { type DbCallConfig, type UseDbCall } from "~/types/db"

export function useDbCall(): UseDbCall {

    const config: DbCallConfig = {
        collection: "Products",
        limitValue: 10,
        orderByField: "date",
        orderByDirection: "desc"
    }

    return {
        getCollection: () => config.collection,
        getLimitValue: () => config.limitValue,
        getOrderByField: () => config.orderByField,
        getOrderByDirection: () => config.orderByDirection
    }

}