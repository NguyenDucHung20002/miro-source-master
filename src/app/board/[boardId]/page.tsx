import Canvas from "../_components/canvas";
import Room from "@/components/room";
import Loading from "../_components/loading";

interface IBoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = ({ params }: IBoardIdPageProps) => {
  return (
    <div className="h-screen ">
      <Room roomId={params.boardId} fallback={<Loading></Loading>}>
        <Canvas boardId={params.boardId}></Canvas>
      </Room>
    </div>
  );
};

export default BoardIdPage;
