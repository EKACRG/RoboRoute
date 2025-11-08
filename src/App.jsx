import './styles.css';

import { useState, useMemo } from 'react';
import GridLayout from './components/GridLayout';
import Navbar from './components/Navbar';
import Dates from './components/Dates';
import MapPaths from './components/MapPaths';

function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const startMax = useMemo(() => (endDate || undefined), [endDate]);
  const endMin = useMemo(() => (startDate || undefined), [startDate]);

  return (
    <>
      <Navbar logo="NPT Telmekom Challenge" menu1Label="Shop" menu2Label="Robot" />
      <div className="flex flex-wrap items-center gap-4 md:flex-row p-[50px] pt-[120px] pb-[0px]">
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
      
      <div className="p-[50px]">
        <GridLayout
          bigSquare={<div><MapPaths /></div>}
          small1={<div>Errors</div>}
          small2={<div>Cleaning Stats</div>}
          small3={<div>Other Stats</div>}
          rect2x1={<div>Other Stats</div>}
          tileClassName="bg-accent/40"
        />
      </div>
    </>
  );
}

export default App;
