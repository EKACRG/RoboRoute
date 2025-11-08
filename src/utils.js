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