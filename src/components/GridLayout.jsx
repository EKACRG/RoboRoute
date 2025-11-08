import React from "react";

function GridLayout({
  bigSquare,
  small1,
  small2,
  small3,
  rect2x1,
  className = "",
  tileClassName = "",
}) {
  const baseTile = "flex items-center justify-center rounded-md border border-border bg-secondary text-foreground shadow-xs";

  return (
    <div className={`grid grid-cols-4 grid-rows-3 gap-4 ${className}`}>
      <div className={`col-span-2 row-span-2 min-h-[500px] ${baseTile} ${tileClassName}`}>
        {bigSquare}
      </div>
      <div className={`col-span-2 row-span-1 ${baseTile} ${tileClassName}`}>
        {small1}
      </div>
      <div className={`col-span-2 row-span-1 ${baseTile} ${tileClassName}`}>
        {small2}
      </div>
    </div>
  );
}

export default GridLayout;
