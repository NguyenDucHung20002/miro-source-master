"use client";

import EmptyBoard from "./empty.board";
import EmptySearch from "./empty.search";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { use } from "react";
import BoardCard from "../board-card/board.card";
import NewBoardButton from "../new.board.button";

interface IBoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorite?: string;
  };
}

const BoardList = ({ orgId, query }: IBoardListProps) => {
  const data = useQuery(api.boards.get, { orgId });

  if (data === undefined) {
    return (
      <div className="p-5">
        <h2 className="text-3xl">
          {query.favorite ? "Favorite boards" : "Team boards"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardButton orgId={orgId} disabled={true} />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }

  if (!data?.length && query.search) {
    return (
      <EmptySearch
        emptyContent="Try to search for anything else"
        emptyKind="search boards"
      ></EmptySearch>
    );
  }

  if (!data?.length && query.favorite) {
    return (
      <EmptySearch
        emptyContent="No favorites in here!"
        emptyKind="favorite boards"
      ></EmptySearch>
    );
  }

  if (!data?.length) {
    return (
      <>
        <EmptyBoard></EmptyBoard>
      </>
    );
  }

  return (
    <div className="p-5">
      <h2 className="text-3xl">
        {query.favorite ? "Favorite boards" : "Team boards"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardButton orgId={orgId}></NewBoardButton>
        {data.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board._creationTime}
            orgId={orgId}
            isFavorite={false}
          ></BoardCard>
        ))}
      </div>
    </div>
  );
};

export default BoardList;
