

import { Group, Image, Layer, Line, Stage } from 'react-konva';
import useImage from 'use-image';

function MapPaths() {
  const [mapImage] = useImage("https://fr-tech-cloud-open.s3.eu-central-1.amazonaws.com/pudu_cloud_platform/production/map/24215E63F38C/f932bcde5fd791775422dd3d9115f985.png");

  return (
    <div className="App">
      <Stage className="stage" width={1200} height={800}>
        <Layer draggable={true}>
          <Group
            x={0}
            y={210}
            scaleX={1}
            scaleY={1}
          >
            <Image image={mapImage} x={0} y={0} />
          </Group>
        </Layer>
      </Stage>

    </div>
  );
}

export default MapPaths;
