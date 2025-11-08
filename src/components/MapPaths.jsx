import { Group, Image, Layer, Line, Rect, Stage } from "react-konva";
import useImage from "use-image";
import { useEffect, useState } from "react";

// Generatore percorso robot
function generateRobotPath(bounds, numPoints = 20, step = 40) {
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

    // Mantieni dentro i bounds
    if (x < bounds.x) x = bounds.x;
    if (x > bounds.x + bounds.width) x = bounds.x + bounds.width;
    if (y < bounds.y) y = bounds.y;
    if (y > bounds.y + bounds.height) y = bounds.y + bounds.height;

    points.push(x, y);
  }

  return points;
}

function MapPaths() {
  const [mapImage] = useImage(
    "https://fr-tech-cloud-open.s3.eu-central-1.amazonaws.com/pudu_cloud_platform/production/map/24215E63F38C/f932bcde5fd791775422dd3d9115f985.png"
  );

  const [robotPaths, setRobotPaths] = useState([]);
  const [showBounds, setShowBounds] = useState(true); // toggle visualizzazione bounds

  // Definisci il bounding box dell’area navigabile
  const bounds = {
    x: 330,
    y: 220,
    width: 150,
    height: 230,
  };

  useEffect(() => {
    const paths = [
      generateRobotPath(bounds, 30, 30),
      generateRobotPath(bounds, 25, 40),
      generateRobotPath(bounds, 20, 35),
      generateRobotPath(bounds, 28, 45),
    ];
    setRobotPaths(paths);
  }, []);

  const colors = ["red", "blue", "green", "orange"];

  return (
    <div className="App" style={{ textAlign: "center" }}>
      <button
        onClick={() => setShowBounds((prev) => !prev)}
        style={{
          marginBottom: "10px",
          padding: "6px 12px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {showBounds ? "Nascondi bounds" : "Mostra bounds"}
      </button>

      <Stage className="stage" width={1200} height={800}>
        <Layer draggable={true}>
          <Group x={0} y={210} scaleX={1} scaleY={1}>
            <Image image={mapImage} x={0} y={0} />

            {/* Mostra o nascondi il rettangolo dei bounds */}
            {showBounds && (
              <Rect
                x={bounds.x}
                y={bounds.y}
                width={bounds.width}
                height={bounds.height}
                stroke="yellow"
                strokeWidth={2}
                dash={[10, 5]}
                listening={false} // così non blocca drag
              />
            )}

            {/* Disegna le linee dei robot */}
            {robotPaths.map((points, i) => (
              <Line
                key={i}
                points={points}
                stroke={colors[i]}
                strokeWidth={3}
                dash={[10, 8]}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
              />
            ))}
          </Group>
        </Layer>
      </Stage>
    </div>
  );
}

export default MapPaths;
