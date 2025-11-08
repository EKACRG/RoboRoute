import { Group, Image, Layer, Line, Rect, Stage } from "react-konva";
import useImage from "use-image";
import { useState, useMemo, useEffect } from "react";
import { useAppStore } from "../lib/shopsStore"
import shopPaths from "../assets/shopPaths.json"

function generateRobotPath(bounds, numPoints = 30, step = 40) {
  const points = [];
  let x = bounds.x + Math.random() * bounds.width;
  let y = bounds.y + Math.random() * bounds.height;
  points.push(x, y);

  for (let i = 1; i < numPoints; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dx = Math.cos(angle) * step;
    const dy = Math.sin(angle) * step;
    x += dx;
    y += dy;

    if (x < bounds.x) x = bounds.x;
    if (x > bounds.x + bounds.width) x = bounds.x + bounds.width;
    if (y < bounds.y) y = bounds.y;
    if (y > bounds.y + bounds.height) y = bounds.y + bounds.height;

    points.push(x, y);
  }
  return points;
}

function MapPaths() {
  const { map, shop } = useAppStore()

  const [mapImage] = useImage(shopPaths[map].url);

  const [robotPaths, setRobotPaths] = useState([]);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showPaths, setShowPaths] = useState(true);

  const bounds = useMemo(() => {
    return {
      x: shopPaths[map].bounds.x,
      y: shopPaths[map].bounds.y,
      width: shopPaths[map].bounds.width,
      height: shopPaths[map].bounds.height,
    };
  }, [map]);

  useEffect(() => {
    // const paths = [
    //   generateRobotPath(bounds, 50, 30),
    //   generateRobotPath(bounds, 45, 35),
    //   generateRobotPath(bounds, 40, 40),
    //   generateRobotPath(bounds, 60, 25),
    // ];
    // console.log(paths)

    setRobotPaths(shopPaths[map][shop]);
  }, [map, shop]);

  const colors = ["#1E90FF", "#FF1493", "#32CD32", "#FFD700"]; // verde più intenso al posto del verde acqua

  // --- HEATMAP CALC ---
  const cellSize = 20;
  const heatData = useMemo(() => {
    const cols = Math.ceil(bounds.width / cellSize);
    const rows = Math.ceil(bounds.height / cellSize);
    const grid = Array.from({ length: rows }, () => Array(cols).fill(0));

    robotPaths.forEach((path) => {
      for (let i = 0; i < path.length; i += 2) {
        const x = path[i];
        const y = path[i + 1];
        const col = Math.floor((x - bounds.x) / cellSize);
        const row = Math.floor((y - bounds.y) / cellSize);
        if (col >= 0 && col < cols && row >= 0 && row < rows) {
          grid[row][col] += 1;
        }
      }
    });

    const maxVal = Math.max(...grid.flat());
    return grid.map((row) => row.map((val) => (maxVal ? val / maxVal : 0)));
  }, [robotPaths]);

  // Funzione helper per mappare valore [0..1] → colore
  const heatColor = (value) => {
    if (value === 0) return "rgba(0,0,0,0)";
    const r = Math.floor(255 * value);
    const g = Math.floor(80 + 100 * (1 - value));
    const b = Math.floor(255 * (1 - value));
    const alpha = 0.4 + 0.4 * value;
    return `rgba(${r},${g},${b},${alpha})`;
  };

  return (
    <div className="App" style={{ textAlign: "center" }}>
      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={() => setShowHeatmap((prev) => !prev)}
          style={{
            marginRight: "10px",
            padding: "6px 12px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {showHeatmap ? "Nascondi Heatmap" : "Mostra Heatmap"}
        </button>

        <button
          onClick={() => setShowPaths((prev) => !prev)}
          style={{
            marginRight: "10px",
            padding: "6px 12px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {showPaths ? "Nascondi Paths" : "Mostra Paths"}
        </button>
      </div>

      <Stage className="stage" width={1200} height={800}>
        <Layer draggable={true}>
          <Group x={0} y={210}>
            <Image image={mapImage} />

            <Rect
              x={bounds.x}
              y={bounds.y}
              width={bounds.width}
              height={bounds.height}
              stroke="yellow"
              strokeWidth={1}
              dash={[10, 5]}
              listening={false}
            />


            {/* Heatmap */}
            {showHeatmap &&
              heatData.map((row, rowIndex) =>
                row.map((val, colIndex) => (
                  <Rect
                    key={`${rowIndex}-${colIndex}`}
                    x={bounds.x + colIndex * cellSize}
                    y={bounds.y + rowIndex * cellSize}
                    width={cellSize}
                    height={cellSize}
                    fill={heatColor(val)}
                    listening={false}
                  />
                ))
              )}

            {/* Paths robot */}
            {showPaths &&
              robotPaths.map((points, i) => (
                <Line
                  key={i}
                  points={points}
                  stroke={colors[i]}
                  strokeWidth={2}
                  tension={0.5}
                  opacity={0.7}
                  lineCap="round"
                />
              ))}

            {/* Bounds opzionale */}
            <Rect
              x={bounds.x}
              y={bounds.y}
              width={bounds.width}
              height={bounds.height}
              stroke="yellow"
              strokeWidth={1}
              dash={[10, 5]}
              listening={false}
            />
          </Group>
        </Layer>
      </Stage>
    </div>
  );
}

export default MapPaths;
