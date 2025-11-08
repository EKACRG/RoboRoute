// Componente singolo input data utilizzabile per start o end.
// Valore nel formato ISO: yyyy-mm-dd (visualizzazione: "yyyy-mm-gg").
function Dates({
  id,
  name,
  label = "Date",
  value = "",
  onChange,
  min,
  max,
}) {
  const inputId = id || name || "date-input";

  const handleChange = (e) => {
    const v = e.target.value; // yyyy-mm-dd
    onChange?.(v);
  };

  return (
    <div className="flex flex-col gap-1 p-2">
      <label htmlFor={inputId} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        type="date"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        className="h-9 rounded-md border border-border bg-background px-3 text-sm text-foreground shadow-xs focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
        aria-describedby={`${inputId}-format`}
      />
    </div>
  );
}

export default Dates;

