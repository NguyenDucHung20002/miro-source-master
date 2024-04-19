"use client";

import Image from "next/image";
import Link from "next/link";
import Overlay from "./overlay";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import Footer from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import Actions from "@/components/actions";
import { MoreHorizontal } from "lucide-react";

interface IBoardCardProps {
  id: string;
  title: string;
  authorName: string;
  authorId: string;
  imageUrl: string;
  orgId: string;
  createdAt: number;
  isFavorite: boolean;
}
const BoardCard = ({
  id,
  title,
  authorName,
  authorId,
  imageUrl,
  orgId,
  createdAt,
  isFavorite,
}: IBoardCardProps) => {
  const { userId } = useAuth();
  const authorLabel = userId === authorId ? "You" : authorName;
  const createAtLabel = formatDistanceToNow(createdAt);
  return (
    <>
      <Link href={`/board/${id}`}>
        <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
          <div className="relative flex-1 bg-amber-50">
            <Image
              src={imageUrl}
              alt="Doodle"
              fill
              className="object-cover"
              quality={70}
              priority={true}
            />
            <Overlay></Overlay>
            <Actions id={id} title={title} side="top">
              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
                <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity"></MoreHorizontal>
              </div>
            </Actions>
          </div>
          <Footer
            isFavorite={isFavorite}
            title={title}
            authorLabel={authorLabel}
            createAtLabel={createAtLabel}
            onClick={() => {}}
            disabled={false}
          ></Footer>
        </div>
      </Link>
    </>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="group aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full"></Skeleton>
    </div>
  );
};

export default BoardCard;
