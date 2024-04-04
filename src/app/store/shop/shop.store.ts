import { Product } from "../../core/models/Product";
import { phones } from '../../core/data/phones';
import {
    patchState,
    signalStore,
    withComputed,
    withMethods,
    withState,
} from '@ngrx/signals';
import { computed, inject } from "@angular/core";
import { withPriceFilterFeature } from "../price-filter/price.store";
import { withbBrandFilterFeature } from "../brand-filter/brand.store";


interface ShopState {
    products: Array<Product>,
    cart: Array<Product>
}



export interface AppState {
    shop: ShopState;
    brandFilter: string;
    orderBy: string;
}
const initialState: AppState = {
    shop: {
        cart: [],
        products: phones
    },
    brandFilter: '',
    orderBy: '',

}

export const shopStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ shop }) => ({
        cartCount: computed(() => shop.cart().length),
    })),
    withMethods((state) => ({
        incrementCartItemQuantity(productId: number): void {
            const updatedCart: any[] = [...state.shop.cart()];
            const updatedItemIndex: number = updatedCart.findIndex((item: any) => item.id === productId);

            if (updatedItemIndex === -1) {
                console.error(`El producto con ID ${productId} no se encontró en el carrito.`);
                return;
            }

            if (updatedCart[updatedItemIndex].quantity > 9) {
                patchState(state, { shop: { cart: state.shop.cart(), products: state.shop.products() } });
                return;
            }

            const incrementedItem: any = { ...updatedCart[updatedItemIndex] };

            if (incrementedItem) {
                incrementedItem.quantity++;
                updatedCart[updatedItemIndex] = incrementedItem;
                patchState(state, { shop: { cart: updatedCart, products: state.shop.products() } });
            }


        },
        decrementCartItemQuantity(productId: number) {
            const updatedCart: any[] = [...state.shop.cart()];
            const updatedItemIndex: number = updatedCart.findIndex((item: any) => item.id === productId);
            if (updatedCart[updatedItemIndex].quantity < 2) {
                patchState(state, { shop: { cart: state.shop.cart(), products: state.shop.products() } });
                return;
            }

            const decrementedItem = {
                ...updatedCart[updatedItemIndex]
            };

            if (decrementedItem) {
                decrementedItem.quantity--;
                updatedCart[updatedItemIndex] = decrementedItem;
                patchState(state, { shop: { cart: updatedCart, products: state.shop.products() } });
            }
        },
        addProductToCart(product: Product) {
            const updatedCart = [...state.shop.cart()];
            const updatedItemIndex = updatedCart.findIndex(item => item.id === product.id);

            if (updatedItemIndex < 0) {
                updatedCart.push({ ...product, quantity: 1 });
            } else {
                const updatedItem = {
                    ...updatedCart[updatedItemIndex]
                };

                updatedItem.quantity = updatedItem.quantity ? updatedItem.quantity++ : 0;
                updatedCart[updatedItemIndex] = updatedItem;
            }
            patchState(state, { shop: { cart: updatedCart, products: state.shop.products() } })
        },
        removeProductToCart(id: number) {
            const updatedCart = [...state.shop.cart()];
            const updatedItemIndex = updatedCart.findIndex(
                item => item.id === id
            );

            updatedCart.splice(updatedItemIndex, 1);
            patchState(state, { shop: { cart: updatedCart, products: state.shop.products() } })
        },
        removeAllFilters(){
            patchState(state,{ brandFilter:'',orderBy: ''})
        }
    })),
    withPriceFilterFeature(),
    withbBrandFilterFeature()
)