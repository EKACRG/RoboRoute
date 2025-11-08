import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

function Navbar({
  logo = "Logo",
  menu1Label = "Shop",
  menu2Label = "Robot",
  className = "",
}) {
  return (
    <nav className={`w-full ${className}`}>
      <div className="fixed left-0 right-0 top-8 z-40 px-13">
        <div className="mx-auto max-w-8xl rounded-xl border bg-background/80 backdrop-blur shadow-md px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">{logo}</span>
            </div>

            <div className="flex items-center gap-2">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="inline-flex items-center gap-1"
                  >
                    <span>{menu1Label}</span>
                    <ChevronDown className="size-4" aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={5}>
                  <DropdownMenuItem>Shop 1</DropdownMenuItem>
                  <DropdownMenuItem>Shop 2</DropdownMenuItem>
                  <DropdownMenuItem>Shop 3</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="inline-flex items-center gap-1"
                  >
                    <span>{menu2Label}</span>
                    <ChevronDown className="size-4" aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={5}>
                  <DropdownMenuItem>Robot 1</DropdownMenuItem>
                  <DropdownMenuItem>Robot 2</DropdownMenuItem>
                  <DropdownMenuItem>Robot 3</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;