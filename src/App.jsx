import './styles.css';

import { useState, useMemo } from 'react';
import GridLayout from './components/GridLayout';
import Navbar from './components/Navbar';
import Dates from './components/Dates';
import MapPaths from './components/MapPaths';
import ErrorsPanel from './components/ErrorsPanel';
import CleaningStats from './components/CleaningStats';

function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const startMax = useMemo(() => (endDate || undefined), [endDate]);
  const endMin = useMemo(() => (startDate || undefined), [startDate]);
  
  const selectedShop = 'shop_1';

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
          bigSquare={<div>Map</div>}
          small1={<ErrorsPanel shopId={selectedShop} />}
          small2={<CleaningStats shopId={selectedShop} />}
          small3={<div>Other Stats</div>}
          rect2x1={<div>Other Stats</div>}
          tileClassName="bg-accent/40"
        />
      </div>
    </>
  );
}

export default App;
