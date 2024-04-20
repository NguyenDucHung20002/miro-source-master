"use client";

import { Info } from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";

interface ICanvasProps {
  boardId: string;
}

const Canvas = ({ boardId }: ICanvasProps) => {
  return (
    <>
      <main className="h-full w-full relative bg-neutral-100 touch-none">
        <Info></Info>
        <Participants></Participants>
        <Toolbar></Toolbar>
      </main>
    </>
  );
};

export default Canvas;
