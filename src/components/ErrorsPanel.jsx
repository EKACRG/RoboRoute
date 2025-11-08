import React, { useMemo } from 'react';
import statsData from '../assets/stats.json';

export default function ErrorsPanel({ shopId }) {
  const errors = statsData?.[shopId]?.errors || [];

  const sorted = useMemo(() => {
    return [...errors].sort((a, b) => (a.error_date < b.error_date ? 1 : -1));
  }, [errors]);

  if (!statsData?.[shopId]) {
    return (
      <div className="w-full h-full overflow-auto p-4 text-sm">
        <h3 className="text-base font-semibold mb-2">Errors</h3>
        <p className="text-muted-foreground">No data available for "{shopId}".</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-auto p-4 text-sm">
      <div className="flex items-baseline justify-between">
        <h3 className="text-base font-semibold">Errors</h3>
        <span className="text-muted-foreground text-xs">Shop: {shopId}</span>
      </div>
      {sorted.length === 0 ? (
        <p className="mt-3 text-muted-foreground">No errors recorded.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {sorted.map((e, idx) => (
            <li
              key={`${e.error_name}-${e.error_date}-${e.robot_name}-${idx}`}
              className="rounded-md border border-border bg-background/40 p-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{e.error_name}</span>
                <span className="text-xs text-muted-foreground">{e.error_date}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">Robot: {e.robot_name}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
