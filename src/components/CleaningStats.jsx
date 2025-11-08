import React from 'react';
import statsData from '../assets/stats.json';

export default function CleaningStats({ shopId }) {
  const cleaning = statsData?.[shopId]?.cleaning;

  if (!statsData?.[shopId]) {
    return (
      <div className="w-full h-full overflow-auto p-4 text-sm">
        <h3 className="text-base font-semibold mb-2">Cleaning</h3>
        <p className="text-muted-foreground">No data available for "{shopId}".</p>
      </div>
    );
  }

  if (!cleaning) {
    return (
      <div className="w-full h-full overflow-auto p-4 text-sm">
        <h3 className="text-base font-semibold mb-2">Cleaning</h3>
        <p className="text-muted-foreground">No cleaning data for this shop.</p>
      </div>
    );
  }

  const rows = [
    { label: 'Average number of tasks', value: cleaning.mean_task_count },
    { label: 'Average covered area', value: cleaning.mean_covered_area },
    { label: 'Average duration', value: cleaning.mean_duration },
    { label: 'Average energy consumption', value: cleaning.mean_power_consumption },
    { label: 'Average water consumption', value: cleaning.mean_water_consumption },
  ];

  return (
    <div className="w-full h-full overflow-auto p-4 text-sm">
      <div className="flex items-baseline justify-between">
        <h3 className="text-base font-semibold">Cleaning</h3>
      </div>
      <div className="mt-3 rounded-md border border-border bg-background/40">
        <table className="w-full text-sm">
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b border-border/60 last:border-b-0">
                <td className="p-2 text-muted-foreground w-1/2">{r.label}</td>
                <td className="p-2 font-medium text-right">{typeof r.value === 'number' ? r.value.toFixed(2) : r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
