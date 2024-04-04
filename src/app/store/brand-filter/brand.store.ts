import { patchState, signalStore, signalStoreFeature, type, withMethods, withState } from "@ngrx/signals";
import { AppState } from "../shop/shop.store";

// export const brandFilterStore = signalStore(
//     { providedIn: 'root' },
//     withState({ brand: '' }),
//     withMethods((store) => ({
//         addBrandToFIlter(name: string) {
//             console.log({ name });
//             console.log(store.brand())
//             if (store.brand().toLowerCase().includes(name)) {
//                 patchState(store, { brand: store.brand() });
//             }

//             patchState(store, { brand: store.brand() + name });
//         },
//         removeBrandFromFilter(name: string) {
//             const reg = new RegExp(name, 'gi');
//             patchState(store, { brand: store.brand().replace(reg, '') });
//         },
//         clearBrandFilter() {
//             patchState(store, { brand: '' });
//         }
//     }))
// )

export function withbBrandFilterFeature() {
    return signalStoreFeature(
        { state: type<AppState>() },
        withMethods((state) => (
            {
                addBrandToFilter(name: string) {
                    if (state.brandFilter().toLowerCase().includes(name)) {
                        patchState(state, { brandFilter: state.brandFilter() });
                    }

                    patchState(state, { brandFilter: state.brandFilter() + name });
                },
                removeBrandFromFilter(name: string) {
                    const reg = new RegExp(name, 'gi');
                    patchState(state, { brandFilter: state.brandFilter().replace(reg, '') });
                },
                clearBrandFilter() {
                    patchState(state, { brandFilter: '' });
                }
            }
        ))
    )
}