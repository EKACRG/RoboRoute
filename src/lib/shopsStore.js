import { create } from 'zustand'

export const useAppStore = create((set) => ({
  map: 'map_1',
  shop: 'shop_1',

  // Select a map and automatically select its first shop
  setMap: (map) => {
    const defaultShop = map === 'map_1' ? 'shop_1' : 'shop_3'
    set({ map, shop: defaultShop })
  },

  // Select a shop directly
  setShop: (shop) => set({ shop }),
}))
