import React from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { useAppStore } from "../lib/shopsStore"


function Navbar({ logo = "Logo", className = "" }) {
  const { map, shop, setMap, setShop } = useAppStore()

  const maps = [
    { key: "map_1", label: "Map 1" },
    { key: "map_2", label: "Map 2" },
  ]

  const shopsByMap = {
    map_1: [
      { key: "shop_1", label: "Shop 1" },
      { key: "shop_2", label: "Shop 2" },
    ],
    map_2: [
      { key: "shop_3", label: "Shop 1" },
      { key: "shop_4", label: "Shop 2" },
    ],
  }

  const currentMapLabel = maps.find((m) => m.key === map)?.label || ""
  const currentShopLabel =
    shopsByMap[map].find((s) => s.key === shop)?.label || ""

  return (
    <nav className={`w-full ${className}`}>
      <div className="fixed left-0 right-0 top-8 z-40 px-13">
        <div className="mx-auto max-w-8xl rounded-xl border bg-background/80 backdrop-blur shadow-md px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">{logo}</span>
            </div>

            <div className="flex items-center gap-4">
              {/* Map selector */}
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="inline-flex items-center gap-1">
                    <span>{currentMapLabel}</span>
                    <ChevronDown className="size-4" aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={5}>
                  {maps.map((m) => (
                    <DropdownMenuItem key={m.key} onClick={() => setMap(m.key)}>
                      {m.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Shop selector */}
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="inline-flex items-center gap-1">
                    <span>{currentShopLabel}</span>
                    <ChevronDown className="size-4" aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={5}>
                  {shopsByMap[map].map((s) => (
                    <DropdownMenuItem key={s.key} onClick={() => setShop(s.key)}>
                      {s.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar