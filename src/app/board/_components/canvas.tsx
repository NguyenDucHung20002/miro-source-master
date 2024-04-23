"use client";

import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
} from "@/types/canvas";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import { useCallback, useState } from "react";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useStorage,
  useUpdateMyPresence,
} from "../../../../liveblocks.config";
import { CursorsPresence } from "./cursors.presence";
import { pointerEventToCanvasPoint } from "@/lib/utils";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer.preview";

const MAX_LAYERS = 100;

interface ICanvasProps {
  boardId: string;
}

const Canvas = ({ boardId }: ICanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const layerIds = useStorage((root) => root.layerIds);
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const updateMyPresence = useUpdateMyPresence();
  const [lastUseColor, setLastUseColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note,
      position: Point
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUseColor,
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);
      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None });
    },
    [lastUseColor]
  );

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  // const onPointerMove = useMutation(
  //   ({ setMyPresence }, e: React.PointerEvent) => {
  //     e.preventDefault();
  //     const current = pointerEventToCanvasPoint(e, camera);

  //     setMyPresence({ cursor: current });
  //   },
  //   []
  // );
  const onPointerMove = (e: React.PointerEvent) => {
    e.preventDefault();
    const current = pointerEventToCanvasPoint(e, camera);
    updateMyPresence({ cursor: current });
  };

  const onPointerLeave = () => {
    updateMyPresence({ cursor: null });
  };

  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({ mode: CanvasMode.None });
      }

      history.resume();
    },
    [camera, canvasState, insertLayer]
  );

  return (
    <>
      <main className="h-full w-full relative bg-neutral-100 touch-none">
        <Info boardId={boardId}></Info>
        <Participants></Participants>
        <Toolbar
          canvasState={canvasState}
          setCanvasState={setCanvasState}
          isCanRedo={canRedo}
          isCanUndo={canUndo}
          undo={history.undo}
          redo={history.redo}
        ></Toolbar>
        <svg
          className="h-[100vh] w-[100vw]"
          onWheel={onWheel}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          onPointerUp={onPointerUp}
        >
          <g style={{ transform: ` translate(${camera.x}px , ${camera.y}px)` }}>
            {layerIds.map((layerId) => (
              <LayerPreview
                key={layerId}
                id={layerId}
                onLayerPointerDown={() => {}}
                selectionColor={"#000"}
              ></LayerPreview>
            ))}
            <CursorsPresence></CursorsPresence>
          </g>
        </svg>
      </main>
    </>
  );
};

export default Canvas;
