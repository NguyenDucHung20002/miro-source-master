"use client";

import { Camera, Color } from "@/types/canvas";
import { memo } from "react";
import { useMutation, useSelf } from "../../../../liveblocks.config";
import { useSelectionBounds } from "@/hooks/use.selection.bounds";
import { ColorPicker } from "./color.picker";
import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";
import { useDeleteLayers } from "@/hooks/use.delete.layers";

interface ISelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

export const SelectionTools = memo(
  ({ camera, setLastUsedColor }: ISelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);
    const selectionBounds = useSelectionBounds();
    const deleteLayers = useDeleteLayers();
    const moveToBack = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");
        const arr = liveLayerIds.toImmutable();
        const indices: number[] = [];

        // const indices = arr.findIndex((val) => selection.includes(val));
        // if (indices > 0) {
        //   liveLayerIds.move(indices, indices - 1);
        // }

        for (let i = 0; i < arr.length; i++) {
          if (selection.includes(arr[i])) {
            indices.push(i);
          }
        }

        for (let i = 0; i < indices.length; i++) {
          liveLayerIds.move(indices[i], i);
        }
      },
      [selection]
    );

    const moveToFront = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");
        const arr = liveLayerIds.toImmutable();
        console.log("arr:", arr);
        const indices: number[] = [];

        // const indices = arr.findIndex((val) => selection.includes(val));
        // console.log("indices:", indices);

        // if (indices < arr.length - 1) {
        //   liveLayerIds.move(indices, indices + 1);
        // }

        for (let i = 0; i < arr.length; i++) {
          if (selection.includes(arr[i])) {
            indices.push(i);
          }
        }
        console.log("indices:", indices);

        for (let i = indices.length - 1; i >= 0; i--) {
          liveLayerIds.move(
            indices[i],
            arr.length - 1 - (indices.length - 1 - i)
          );
        }
      },
      [selection]
    );

    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);

        selection.forEach((id) => {
          liveLayers.get(id)?.set("fill", fill);
        });
      },
      [selection, setLastUsedColor]
    );

    if (!selectionBounds) return null;

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;
    return (
      <div
        className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
        style={{
          transform: `translate(
          calc(${x}px - 50%),
          calc(${y - 16}px - 100%)
        )`,
        }}
      >
        <ColorPicker onChange={setFill}></ColorPicker>
        <div className="flex flex-col gap-y-0.5">
          <Hint label="Bring to front" sideOffset={10}>
            <Button variant="board" onClick={moveToFront}>
              <BringToFront></BringToFront>
            </Button>
          </Hint>
          <Hint label="Send to back" side="bottom" sideOffset={10}>
            <Button variant="board" onClick={moveToBack}>
              <SendToBack></SendToBack>
            </Button>
          </Hint>
        </div>
        <div className="flex items-center pl-2 ml-1 border-l border-neutral-200">
          <Hint label="Delete" sideOffset={10}>
            <Button variant="board" size="icon" onClick={deleteLayers}>
              <Trash2></Trash2>
            </Button>
          </Hint>
        </div>
      </div>
    );
  }
);

SelectionTools.displayName = "SelectionTools";
