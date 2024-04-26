"use client";

import { memo } from "react";
import {
  useOthersConnectionIds,
  useOthersMapped,
} from "../../../../liveblocks.config";
import Cursor from "./cursor";
import { shallow } from "@liveblocks/client";
import { Path } from "./path";
import { colorToCss } from "@/lib/utils";

const Cursors = () => {
  const ids = useOthersConnectionIds();
  return (
    <>
      {ids.map((connectionId) => {
        return <Cursor key={connectionId} connectionId={connectionId} />;
      })}
    </>
  );
};

const Draft = () => {
  const others = useOthersMapped(
    (other) => ({
      pencilDraft: other.presence.pencilDraft,
      penColor: other.presence.penColor,
    }),
    shallow
  );

  return (
    <>
      {others.map(([key, other]) => {
        if (other.pencilDraft) {
          return (
            <Path
              key={key}
              x={0}
              y={0}
              points={other.pencilDraft}
              fill={other.penColor ? colorToCss(other.penColor) : "#1e272e"}
            />
          );
        }
      })}
    </>
  );
};

export const CursorsPresence = memo(() => {
  return (
    <>
      <Draft />
      <Cursors />
    </>
  );
});

CursorsPresence.displayName = "CursorsPresence";
