import './styles.css';

import { useState, useMemo } from 'react';
import Dates from './components/Dates';
import MapPaths from './components/MapPaths';

function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // vincolo end >= start via attributi min/max
  const startMax = useMemo(() => (endDate || undefined), [endDate]);
  const endMin = useMemo(() => (startDate || undefined), [startDate]);

  // esempio di processing: qui puoi consumare i due valori
  // useEffect(() => { ... }, [startDate, endDate])

  return (
    <>
      <div className="flex flex-wrap items-center gap-4 md:flex-row p-2">
        <Dates
          label="Start date"
          name="start-date"
          value={startDate}
          onChange={setStartDate}
          max={startMax}
        />
        <Dates
          label="End date"
          name="end-date"
          value={endDate}
          onChange={setEndDate}
          min={endMin}
        />
      </div>

      {/* Anteprima valori selezionati (facoltativa) */}
      <div className="p-2 text-sm text-muted-foreground">
        <div>Start: {startDate || '—'}</div>
        <div>End: {endDate || '—'}</div>
      </div>

      <MapPaths />
    </>
  );
}

export default App;
