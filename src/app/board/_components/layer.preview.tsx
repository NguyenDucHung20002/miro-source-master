"use client";

import { memo } from "react";
import { useStorage } from "../../../../liveblocks.config";
import { LayerType } from "@/types/canvas";
import { Rectangle } from "./rectangle";

interface ILayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}

export const LayerPreview = memo(
  ({ id, onLayerPointerDown, selectionColor }: ILayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) return null;

    switch (layer.type) {
      case LayerType.Rectangle:
        return (
          <>
            <Rectangle
              id={id}
              layer={layer}
              onPointerDown={onLayerPointerDown}
              selectionColor={selectionColor}
            />
          </>
        );

      default:
        console.log("unknown type");
        return null;
    }
  }
);

LayerPreview.displayName = "LayerPreview";
