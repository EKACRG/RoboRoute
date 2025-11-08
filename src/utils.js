export function generateRectanglePoints(width, height, offsetX, offsetY, rotationDeg) {
  // Convertiamo la rotazione in radianti
  const rotation = (rotationDeg * Math.PI) / 180;

  // Definiamo i 4 vertici del rettangolo centrato in (0,0)
  const vertices = [
    { x: -width / 2, y: -height / 2 },
    { x: width / 2, y: -height / 2 },
    { x: width / 2, y: height / 2 },
    { x: -width / 2, y: height / 2 },
  ];

  // Ruotiamo e applichiamo l'offset
  const points = vertices.flatMap((v) => {
    const xRot = v.x * Math.cos(rotation) - v.y * Math.sin(rotation);
    const yRot = v.x * Math.sin(rotation) + v.y * Math.cos(rotation);
    return [xRot + offsetX, yRot + offsetY];
  });

  // Chiudiamo il rettangolo aggiungendo il primo punto alla fine
  points.push(points[0], points[1]);

  return points;
}

// Genera un percorso random ma “smooth” all’interno dei bounds specificati
export function generateRobotPath(bounds, numPoints = 20, step = 40) {
  const points = [];

  let x = bounds.x + Math.random() * bounds.width;
  let y = bounds.y + Math.random() * bounds.height;

  points.push(x, y);

  for (let i = 1; i < numPoints; i++) {
    // direzione random con variazione dolce
    const angle = Math.random() * Math.PI * 2;
    const dx = Math.cos(angle) * step;
    const dy = Math.sin(angle) * step;

    x += dx;
    y += dy;

    // resta dentro i bounds
    if (x < bounds.x) x = bounds.x;
    if (x > bounds.x + bounds.width) x = bounds.x + bounds.width;
    if (y < bounds.y) y = bounds.y;
    if (y > bounds.y + bounds.height) y = bounds.y + bounds.height;

    points.push(x, y);
  }

  return points;
}
