import './styles.css';

import { useMemo, useState } from 'react';
import { Circle, Group, Image, Layer, Line, Stage, Star, Text } from 'react-konva';
import useImage from 'use-image';
import {generateRectanglePoints} from "./utils"

import TestMapData from './assets/data2.json';

function MapExample() {
  const [mapData, setMapData] = useState(TestMapData);
  const [robotPos, setRobotPos] = useState({ x: 0, y: 0 });

  const mapImageUrl = useMemo(() => {
    if (!mapData) {
      return "";
    }

    return mapData.data.url;
  }, [mapData]);
  console.log(mapImageUrl)
  const [mapImage] = useImage(mapImageUrl);

  const [imageOriginX, imageOriginY] = useMemo(() => {
    if (!mapData) {
      return [0, 0];
    }
    return mapData.data.origin_list;
  }, [mapData]);

  const scaleRatio = useMemo(() => {
    if (!mapData) {
      return 1;
    }

    return mapData.data.scale_ratio;
  }, [mapData]);

  const [translateX, translateY] = useMemo(() => {
    if (!mapData) {
      return [0, 0];
    }
    return [mapData.data.canvas_translate_x, mapData.data.canvas_translate_y];
  }, [mapData]);

  function handleMapDataChange(evt) {
    const mapDataText = evt.target.value;

    try {
      const mapDataJson = JSON.parse(mapDataText.trim());

      setMapData(mapDataJson);
    } catch (error) {
      console.error(error, "error");
    }
  }

  return (
    <div className="App">
      {/* <div className="json-container">
        <textarea
          id="json"
          className="json-input"
          placeholder="输入接口返回的json地图数据"
          onChange={(evt) => handleMapDataChange(evt)}
        />
      </div> */}

      {!mapData && <div className="stage">stage</div>}
      {mapData && (
        <div className="robot-pos">
          <label>Robot Position:</label>
          <input
            placeholder="x"
            onChange={(evt) => {
              if ((Number, isFinite(+evt.target.value))) {
                setRobotPos((pos) => ({ ...pos, x: +evt.target.value }));
              }
            }}
          />
          <input
            placeholder="y"
            onChange={(evt) => {
              if (Number.isFinite(+evt.target.value)) {
                setRobotPos((pos) => ({ ...pos, y: +evt.target.value }));
              }
            }}
          />
        </div>
      )}
      {mapData && (
        <Stage className="stage" width={1200} height={800}>
          <Layer draggable={true}>
            <Group
              x={translateX}
              y={translateY}
              scaleX={scaleRatio}
              scaleY={scaleRatio}
            >
              <Image image={mapImage} x={imageOriginX} y={imageOriginY} />

              <Line
                // points={[-60, -50, -90, -630, 120, -660]}
                points={generateRectanglePoints(370, 640, 110, -330, -4)}
                stroke="orange"
                strokeWidth={4}
                tension={0.05}
                dash={[10, 5]} // 10 px linea, 5 px spazio → tratteggio
              />


              {mapData.data.element_list.map((item, index) => {
                if (item.type === "area" || item.type === "edge") {
                  return (
                    <>
                      <Line
                        key={index + "_1"}
                        points={item.vector_list}
                        stroke={"green"}
                        closed={true}
                      />
                      <Line
                        key={index + "_2"}
                        points={item.clean_path_list
                          .map((p) => [p.x, p.y])
                          .flat()}
                        stroke={"red"}
                      />
                    </>
                  );
                } else if (item.type === "track") {
                  return (
                    <Line
                      key={index + "_track"}
                      points={item.vector_list}
                      stroke="red"
                      strokeWidth={6}
                    />
                  );
                } else {
                  return (
                    <>
                      <Circle
                        key={index + "_circle"}
                        fill="purple"
                        x={item.vector_list[0]}
                        y={item.vector_list[1]}
                        radius={8}
                      />
                      <Text
                        key={index + "_text"}
                        x={item.vector_list[0]}
                        y={item.vector_list[1]}
                        text={item.name}
                        fill="red"
                      />
                    </>
                  );
                }
              })}

              {mapData.data.zone_list.map((zone, index) => {
                return (
                  <Line
                    key={index + "_zone"}
                    points={zone.zone_node_list
                      .map((node) => node.vector_list)
                      .flat()}
                    fill="blue"
                    stroke={"blue"}
                    closed={true}
                    opacity={0.5}
                  />
                );
              })}

              <Star
                x={robotPos.x}
                y={robotPos.y}
                numberPoints={3}
                innerRadius={12}
                outerRadius={20}
                fill="yellow"
                stroke="purple"
              />
            </Group>
          </Layer>
        </Stage>
      )}
    </div>
  );
}

export default MapExample;
