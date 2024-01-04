import { PRODUCT } from "./actionTypes"

export const setProducts = (products) => {
    return {
        type: PRODUCT.SET,
        payload: products,
    }
}