import { type DbCallConfig, type UseDbCall } from "~/types/db"

export function useDbCall(): UseDbCall {

    const config: DbCallConfig = {
        collection: "Products",
        limitValue: 10,
        field: {
            date: "date",
            name: "name",
            id: "id",
            desc: "desc"
        },
        orderByDirection: "desc",
    }

    return {
        getCollection: () => config.collection,
        getLimitValue: () => config.limitValue,
        getField: () => config.field,
        getOrderByDirection: () => config.orderByDirection,
    }

}