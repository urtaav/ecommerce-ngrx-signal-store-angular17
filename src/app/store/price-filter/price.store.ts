import { patchState, signalStore, signalStoreFeature, type, withMethods, withState } from "@ngrx/signals";
import { AppState } from "../shop/shop.store";

// export const priceFilterStore = signalStore(
//     { providedIn: 'root' },
//     withState({ order: '' }),
//     withMethods((store) => ({
//         orderByASC() {
//             patchState(store, { order: 'asc' });
//         },
//         orderByDESC() {
//             patchState(store, { order: 'desc' });
//         },
//         clearOrderByPrice() {
//             patchState(store, { order: '' });
//         }
//     }))
// )

export function withPriceFilterFeature() {
    return signalStoreFeature(
        { state: type<AppState>() },
        withMethods((state) => (
            {
                orderByASC() {
                    patchState(state, { orderBy: 'asc' });
                },
                orderByDESC() {
                    patchState(state, { orderBy: 'desc' });
                },
                clearOrderByPrice() {
                    patchState(state, { orderBy: '' });
                }   
            }
        ))
    )
}